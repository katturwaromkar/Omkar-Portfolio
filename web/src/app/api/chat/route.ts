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

// Route handlers are not cached by default; this one must run per-request.
export const dynamic = "force-dynamic";

// Build a compact knowledge base from the real portfolio data so the model
// answers accurately and never invents facts.
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
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Graceful degradation: with no key configured, tell the client to use its
  // built-in local assistant instead of erroring.
  if (!apiKey) {
    return Response.json(
      { error: "llm_unconfigured", reply: null },
      { status: 503 },
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await request.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json({ error: "no_messages" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    // Stream server-side (avoids HTTP timeouts), then collect the full reply.
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: buildSystemPrompt(),
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const final = await stream.finalMessage();
    const reply = final.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: "upstream_error" }, { status: 502 });
    }
    return Response.json({ error: "unknown" }, { status: 500 });
  }
}
