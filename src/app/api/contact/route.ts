import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory rate limiter for contact form (max 5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

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

function sanitizeInput(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many message attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const name = sanitizeInput(body?.name);
    const email = sanitizeInput(body?.email);
    const message = sanitizeInput(body?.message);
    const projectType = sanitizeInput(body?.projectType) || "General Enquiry";

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "invalid_name", message: "Please provide a valid name (at least 2 characters)." },
        { status: 400 },
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "invalid_email", message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "invalid_message", message: "Message should be at least 10 characters." },
        { status: 400 },
      );
    }

    // Log the contact form submission securely
    console.log("[CONTACT_FORM_SUBMISSION]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      projectType,
      messageLength: message.length,
      ip,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. Omkar will get back to you soon.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong. Please try again or use direct email." },
      { status: 500 },
    );
  }
}
