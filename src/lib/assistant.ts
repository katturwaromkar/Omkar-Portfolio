// ============================================================================
// Client-side knowledge engine for the AI assistant.
// Scores each intent against the question and answers from real portfolio data.
// Works with zero API key; the chat UI upgrades to a real LLM automatically
// when /api/chat is configured (see app/api/chat/route.ts).
// ============================================================================

import {
  profile,
  skillGroups,
  projects,
  experience,
  education,
  certifications,
  services,
} from "@/data/portfolio";

type Intent = {
  keywords: string[];
  answer: () => string;
};

const list = (items: string[]) => items.map((i) => `• ${i}`).join("\n");

const intents: Intent[] = [
  {
    keywords: ["hi", "hello", "hey", "namaste", "yo", "greetings"],
    answer: () =>
      `Hi! 👋 I'm ${profile.shortName}'s AI assistant. Ask me about his skills, projects, experience, education, or how to get in touch.`,
  },
  {
    keywords: ["who", "about", "tell me about", "introduce", "summary", "bio"],
    answer: () =>
      `${profile.name} is an ${profile.roles[0]} & Full-Stack Developer based in ${profile.location}. ${profile.summary}`,
  },
  {
    keywords: ["skill", "tech", "stack", "technolog", "language", "know", "tools"],
    answer: () =>
      `Here's what ${profile.shortName} works with:\n\n` +
      skillGroups
        .map(
          (g) =>
            `${g.category}: ${g.skills.map((s) => s.name).join(", ")}`,
        )
        .join("\n"),
  },
  {
    keywords: ["project", "build", "built", "portfolio", "work", "case study", "made"],
    answer: () =>
      `He's built ${projects.length} key projects:\n\n` +
      list(projects.map((p) => `${p.title} — ${p.tagline}`)),
  },
  {
    keywords: ["ai", "ml", "machine learning", "nlp", "vision", "deep learning"],
    answer: () => {
      const ai = projects.filter((p) => p.categories.includes("ai"));
      return (
        `AI/ML is his focus. Relevant projects:\n\n` +
        list(ai.map((p) => `${p.title} — ${p.tagline}`)) +
        `\n\nCore AI skills: ${skillGroups[0].skills.map((s) => s.name).join(", ")}.`
      );
    },
  },
  {
    keywords: ["experience", "intern", "job", "career", "company", "worked", "employ"],
    answer: () =>
      `Professional experience:\n\n` +
      experience
        .map((e) => `${e.role} @ ${e.company} (${e.period})`)
        .join("\n"),
  },
  {
    keywords: ["education", "degree", "college", "university", "study", "cgpa", "btech"],
    answer: () =>
      `Education:\n\n` +
      education.map((e) => `${e.degree} — ${e.institute} (${e.score})`).join("\n"),
  },
  {
    keywords: ["cert", "course", "qualification"],
    answer: () =>
      `Certifications:\n\n` +
      list(certifications.map((c) => `${c.name} — ${c.org}`)),
  },
  {
    keywords: ["service", "offer", "freelance", "consult", "help with"],
    answer: () =>
      `Services offered:\n\n` +
      list(services.map((s) => `${s.title}: ${s.desc}`)),
  },
  {
    keywords: ["contact", "email", "reach", "phone", "call", "whatsapp", "connect", "hire", "available"],
    answer: () =>
      `${profile.availability} ✅\n\n📧 ${profile.email}\n📞 ${profile.phone}\n📍 ${profile.location}\n\nUse the contact form below, or message on WhatsApp — usually replies within a day.`,
  },
  {
    keywords: ["resume", "cv", "download"],
    answer: () =>
      `You can download ${profile.shortName}'s resume from the navbar "Resume" button or the Contact section — it covers skills, experience and projects in full.`,
  },
  {
    keywords: ["location", "where", "based", "city", "from", "live"],
    answer: () =>
      `${profile.shortName} is based in ${profile.location} (originally from ${profile.origin}).`,
  },
];

export function answerLocally(question: string): string {
  const q = question.toLowerCase();
  let best: { score: number; intent: Intent | null } = { score: 0, intent: null };

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.length; // longer matches weigh more
    }
    if (score > best.score) best = { score, intent };
  }

  if (best.intent && best.score > 0) return best.intent.answer();

  return (
    `Great question! I can tell you about ${profile.shortName}'s skills, projects, ` +
    `experience, education, services, or how to get in touch. Try "What AI projects has he built?" ` +
    `or "Is he available for work?"`
  );
}

export const suggestedQuestions = [
  "Tell me about Omkar",
  "What AI projects has he built?",
  "What technologies does he know?",
  "Is he available for work?",
];
