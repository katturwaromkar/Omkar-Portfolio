import Anthropic from "@anthropic-ai/sdk";
import {
  profile,
  skillGroups,
  projects,
  experience,
  education,
  certifications,
  services,
} from "@/data/portfolio";

export const dynamic = "force-dynamic";

// Simple in-memory rate limiter (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Periodically clean up stale rate limit entries
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

// Sanitize user text to prevent prompt injection and script tag risks
function sanitizeInput(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim()
    .slice(0, 1000); // cap max 1000 chars per message
}

function buildSystemPrompt(): string {
  const skills = skillGroups
    .map((g) => `${g.category}: ${g.skills.map((s) => s.name).join(", ")}`)
    .join("\n");
  const projectList = projects
    .map((p) => `- ${p.title} (${p.categories.join("/")}): ${p.tagline}`)
    .join("\n");
  const expList = experience
    .map((e) => `- ${e.role} @ ${e.company} (${e.period})`)
    .join("\n");
  const eduList = education
    .map((e) => `- ${e.degree}, ${e.institute} (${e.score})`)
    .join("\n");

  return `You are the AI assistant embedded in ${profile.name}'s portfolio website. You answer visitor and recruiter questions about Omkar concisely, warmly, and accurately.

RULES:
- Answer ONLY from the facts below. If asked something not covered, say you don't have that detail and point them to the contact section.
- Keep answers short (1-4 sentences unless asked for detail). Speak about Omkar in the third person.
- Be encouraging about his fit for AI / full-stack / ML roles, but never fabricate experience.

FACTS:
Name: ${profile.name}
Role: AI Engineer & Full-Stack Developer
Summary: ${profile.summary}
Location: ${profile.location} (originally ${profile.origin})
Availability: ${profile.availability}
Contact: ${profile.email} | ${profile.phone}

SKILLS:
${skills}

PROJECTS:
${projectList}

EXPERIENCE:
${expList}

EDUCATION:
${eduList}

CERTIFICATIONS: ${certifications.map((c) => c.name).join(", ")}
SERVICES: ${services.map((s) => s.title).join(", ")}`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  // Extract client IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "too_many_requests", message: "Rate limit exceeded. Please try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "llm_unconfigured", reply: null },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  let rawMessages: unknown[];
  try {
    const body = await request.json();
    rawMessages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json(
      { error: "bad_request", message: "Invalid JSON body" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (rawMessages.length === 0) {
    return Response.json(
      { error: "no_messages", message: "Messages payload cannot be empty" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Validate and sanitize messages array (limit to last 10 messages max)
  const validMessages: ChatMessage[] = rawMessages
    .slice(-10)
    .filter((m): m is ChatMessage => {
      if (typeof m !== "object" || m === null) return false;
      const msg = m as Record<string, unknown>;
      return (
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string" &&
        msg.content.trim().length > 0
      );
    })
    .map((m) => ({
      role: m.role,
      content: sanitizeInput(m.content),
    }));

  if (validMessages.length === 0) {
    return Response.json(
      { error: "invalid_messages", message: "No valid messages found" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: validMessages.map((m) => ({ role: m.role, content: m.content })),
    });

    const final = await stream.finalMessage();
    const reply = final.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json(
      { reply },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "X-Content-Type-Options": "nosniff",
        },
      },
    );
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: "upstream_error" }, { status: 502 });
    }
    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}

