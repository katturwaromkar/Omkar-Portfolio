// ============================================================================
// SINGLE SOURCE OF TRUTH — all portfolio content lives here.
// Edit this file to update the site. Pulled from Omkar's resume + original site.
// ============================================================================

export const profile = {
  name: "Omkar Maroti Katturwar",
  shortName: "Omkar Katturwar",
  initials: "OK",
  // Rotating roles for the hero typewriter
  roles: [
    "AI Engineer",
    "Full-Stack Developer",
    "Freelance Developer",
    "Python Developer",
    "ML & NLP Specialist",
    "ERP Consultant",
  ],
  tagline:
    "Pioneering AI solutions — Deep Learning, NLP & Computer Vision. I build intelligent, scalable systems that drive real-world impact.",
  summary:
    "Python & AI Developer with hands-on experience building real-world applications using Python, Django, Machine Learning and REST APIs. Strong in backend development, data processing and AI-assisted systems, with a solid foundation in computer-science fundamentals.",
  location: "Pune, Maharashtra, India",
  origin: "Naigaon, Nanded, Maharashtra",
  email: "katturwaroma313@gmail.com",
  phone: "+91 7219290885",
  phoneRaw: "917219290885",
  dob: "3 January 2003",
  availability: "Available for freelance & full-time opportunities",
  resumePdf: "/assets/resume.pdf",
  photo: "/assets/profile1.jpeg",
} as const;

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omkar-katturwar-192a96257",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/katturwaromkar", icon: "github" },
  { label: "X", href: "https://x.com/omkarkatturwar", icon: "x" },
  {
    label: "Instagram",
    href: "https://instagram.com/katturwar_omkar_",
    icon: "instagram",
  },
  { label: "Email", href: "mailto:katturwaroma313@gmail.com", icon: "mail" },
] as const;

export const about = {
  mission:
    "To engineer AI systems that are not just intelligent, but genuinely useful — turning complex models into products people rely on.",
  vision:
    "To become a technologist who bridges deep AI research and real production software, building tools that scale from a prototype to thousands of users.",
  facts: [
    { label: "Qualification", value: "B.Tech CSE (Artificial Intelligence)" },
    { label: "Date of Birth", value: "3 January 2003" },
    { label: "Location", value: "Pune, India" },
    { label: "Email", value: "katturwaroma313@gmail.com" },
    { label: "Phone", value: "+91 7219290885" },
    { label: "Languages", value: "English, Hindi, Marathi" },
  ],
} as const;

// ---------------------------------------------------------------------------
// SKILLS — grouped by category, each with a proficiency for the radial/bars
// ---------------------------------------------------------------------------
export const skillGroups = [
  {
    category: "AI & Machine Learning",
    icon: "brain",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "NLP", level: 82 },
      { name: "Computer Vision", level: 80 },
      { name: "TensorFlow / PyTorch", level: 78 },
      { name: "Scikit-learn / Keras", level: 80 },
      { name: "LLM Applications", level: 75 },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Python", level: 90 },
      { name: "Django", level: 85 },
      { name: "Flask / FastAPI", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "Java", level: 70 },
    ],
  },
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "HTML / CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React / Next.js", level: 75 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Data & DevOps",
    icon: "database",
    skills: [
      { name: "MySQL / PostgreSQL", level: 80 },
      { name: "MongoDB", level: 72 },
      { name: "Pandas / NumPy", level: 85 },
      { name: "Git / GitHub", level: 85 },
      { name: "Docker", level: 65 },
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// EXPERIENCE — reverse-chronological timeline
// ---------------------------------------------------------------------------
export const experience = [
  {
    role: "Freelance Full-Stack & AI Developer",
    company: "Self-Employed",
    location: "Remote · Pune, India",
    period: "2024 — Present",
    current: true,
    points: [
      "Design, build and ship end-to-end web applications and AI-powered solutions for clients across domains.",
      "Own the full lifecycle — requirement gathering, architecture, development, deployment and ongoing support.",
      "Integrate ML/NLP features, REST APIs and third-party services into modern, responsive products.",
      "Manage client communication, timelines and deliverables independently.",
    ],
    tech: ["Full-Stack", "AI Integration", "React", "Python", "REST APIs"],
  },
  {
    role: "Junior Software Developer",
    company: "Code Serve Tech Solutions",
    location: "Pune",
    period: "2026 — Present",
    current: true,
    points: [
      "Building and maintaining full-stack web applications with modern JavaScript, Python and REST APIs.",
      "Developing AI-assisted features and integrating ML/NLP capabilities into client products.",
      "Collaborating with the team on architecture, code reviews and shipping production releases.",
      "Writing clean, reusable, scalable code and contributing across the development lifecycle.",
    ],
    tech: ["JavaScript", "Python", "React", "REST APIs", "AI Integration"],
  },
  {
    role: "Technical Support Engineer",
    company: "Twinkle IT Solution Pvt Ltd",
    location: "Pune",
    period: "Aug 2025 — May 2026",
    current: false,
    points: [
      "Designed and maintained dynamic, client-driven websites while providing technical support over email, phone, remote sessions and on-site visits.",
      "Collaborated with development and QA teams to resolve complex issues and ship product enhancements.",
      "Generated leads and promoted ERP software to schools and colleges through demos and presentations.",
      "Owned client relationships, ERP implementation, onboarding and deployment end-to-end.",
      "Prepared proposals, handled negotiations and maintained CRM records and sales insights.",
    ],
    tech: ["Web Development", "ERP", "Technical Support", "CRM"],
  },
  {
    role: "Software Test Intern",
    company: "Marks Technosystem Pvt Ltd",
    location: "Kothrud, Pune",
    period: "Apr 2025 — Aug 2025",
    current: false,
    points: [
      "Performed embedded software testing and validation for hardware-integrated products.",
      "Authored product-testing documentation and defect reports.",
      "Optimised QA workflows and collaborated closely with development teams.",
    ],
    tech: ["Embedded Testing", "QA", "Documentation"],
  },
  {
    role: "IT Assistant / Admin",
    company: "Prado Pvt Ltd",
    location: "Pune",
    period: "Aug 2024 — May 2025",
    current: false,
    points: [
      "Handled IT maintenance, procurement and systems administration.",
      "Supported admin and HR operations across the organisation.",
    ],
    tech: ["IT Administration", "Procurement", "Support"],
  },
] as const;

// ---------------------------------------------------------------------------
// PROJECTS — full case studies, filterable by category
// ---------------------------------------------------------------------------
export type ProjectCategory = "ai" | "web" | "fullstack" | "automation";

export const projects = [
  {
    slug: "ai-interview-evaluation",
    title: "AI Interview Evaluation System",
    subtitle: "AI HR Agent & Proctoring Suite — Final Year Project",
    categories: ["ai", "fullstack"] as ProjectCategory[],
    featured: true,
    tagline:
      "End-to-end interview automation with an AI HR agent and real-time computer-vision proctoring.",
    problem:
      "Manual technical screening is slow, inconsistent and hard to scale, and remote assessments are easy to game.",
    solution:
      "An AI HR agent conducts role-specific technical and aptitude interviews, while a computer-vision proctoring layer runs high-frequency camera checks for malpractice — eye-tracking, multiple-person detection and tab-switch alerts.",
    features: [
      "Role-specific AI interviewer with adaptive questioning",
      "Real-time proctoring via computer vision",
      "Eye-tracking & multiple-person detection",
      "Tab-switch and focus-loss alerts",
      "Automated scoring and candidate reports",
    ],
    results: [
      "Automates the first-round technical screen end-to-end",
      "Reduces manual interviewer hours significantly",
      "Flags malpractice in real time",
    ],
    tech: ["Python", "Computer Vision", "OpenCV", "NLP", "Flask", "ML"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "ai-portfolio",
    title: "AI-Integrated Portfolio",
    subtitle: "Personal Brand Hub with Conversational AI",
    categories: ["ai", "web"] as ProjectCategory[],
    featured: true,
    tagline:
      "A living résumé — a portfolio with a custom AI assistant that answers recruiter questions in real time.",
    problem:
      "Static portfolios make recruiters dig for answers; there is no fast way to ask 'what has he actually built?'.",
    solution:
      "A responsive, high-end portfolio with a custom-trained conversational assistant that answers FAQs about skills, projects and availability through natural language.",
    features: [
      "Conversational AI assistant trained on résumé data",
      "Premium, animated, fully responsive UI",
      "Interactive project case studies",
      "Light / dark theming",
    ],
    results: [
      "Turns a passive résumé into an interactive experience",
      "Lets recruiters self-serve answers instantly",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "AI"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "medico-emart",
    title: "Medico E-Mart",
    subtitle: "Pharmaceutical E-commerce Platform",
    categories: ["web", "fullstack"] as ProjectCategory[],
    featured: false,
    tagline:
      "A full-stack e-commerce platform built for medical supplies and prescription / OTC medicine.",
    problem:
      "Buying medical supplies online needs secure auth, careful inventory handling and healthcare-aware search — generic e-commerce doesn't fit.",
    solution:
      "A full-stack store with secure authentication, inventory management, a streamlined checkout flow and a specialised search architecture for healthcare products.",
    features: [
      "Secure user authentication",
      "Inventory management",
      "Streamlined checkout flow",
      "Healthcare-specific product search",
    ],
    results: [
      "Complete prescription & OTC purchase journey",
      "Secure, role-aware account handling",
    ],
    tech: ["Django", "Python", "MySQL", "REST APIs", "HTML/CSS"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "modern-music-player",
    title: "Modern Music Player",
    subtitle: "Local & Cloud Audio Streamer",
    categories: ["web"] as ProjectCategory[],
    featured: false,
    tagline:
      "A feature-rich music app with playlists, a live frequency visualiser and ID3 metadata extraction.",
    problem:
      "Most lightweight players lack a polished UI and rich features like dynamic playlists and visualisation.",
    solution:
      "A sleek audio app for managing and playing libraries, with dynamic playlists, an interactive frequency visualiser and ID3-tag metadata extraction.",
    features: [
      "Dynamic playlist creation",
      "Interactive frequency visualiser",
      "ID3 metadata extraction",
      "Clean, responsive player UI",
    ],
    results: [
      "Smooth listening experience across a local library",
      "Real-time audio visualisation",
    ],
    tech: ["JavaScript", "Web Audio API", "HTML/CSS"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "smart-resume-analyzer",
    title: "Smart Resume Analyzer",
    subtitle: "AI Resume ↔ Job-Description Matcher",
    categories: ["ai", "fullstack"] as ProjectCategory[],
    featured: true,
    tagline:
      "Upload a job description and get an instant skill-match score, gap analysis and tailored suggestions.",
    problem:
      "Candidates can't tell how well their résumé fits a role, and recruiters waste time on poorly matched profiles.",
    solution:
      "An NLP engine parses the résumé and a target job description, extracts skills and keywords, computes a match percentage and highlights missing skills with actionable suggestions.",
    features: [
      "Résumé & job-description parsing (NLP)",
      "Skill-match percentage scoring",
      "Gap analysis with missing-skill highlights",
      "Tailored improvement suggestions",
    ],
    results: [
      "Instant, quantified fit feedback",
      "Helps candidates target the right roles faster",
    ],
    tech: ["Python", "NLP", "spaCy", "Flask", "Scikit-learn"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "face-recognition-attendance",
    title: "Face Recognition Attendance",
    subtitle: "Computer-Vision Attendance System",
    categories: ["ai", "automation"] as ProjectCategory[],
    featured: false,
    tagline:
      "Contactless attendance that recognises faces in real time and logs entries automatically.",
    problem:
      "Manual and card-based attendance is slow, easy to fake (proxy) and hard to audit.",
    solution:
      "A computer-vision system detects and recognises registered faces from a live camera feed, marks attendance automatically and stores time-stamped records in a database.",
    features: [
      "Real-time face detection & recognition",
      "Automatic, contactless attendance logging",
      "Time-stamped records in a database",
      "Proxy-resistant identity verification",
    ],
    results: [
      "Removes manual roll-calls entirely",
      "Eliminates proxy attendance",
    ],
    tech: ["Python", "OpenCV", "face-recognition", "SQLite"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "school-erp-system",
    title: "School / College ERP",
    subtitle: "Institution Management Platform",
    categories: ["web", "fullstack"] as ProjectCategory[],
    featured: false,
    tagline:
      "An ERP that manages students, fees, attendance and academics for schools and colleges.",
    problem:
      "Institutions juggle admissions, fees, attendance and results across disconnected spreadsheets and registers.",
    solution:
      "A unified ERP with role-based access for admins, teachers and students — covering admissions, fee management, attendance, exams and reporting in one dashboard.",
    features: [
      "Role-based dashboards (admin / teacher / student)",
      "Admissions, fees and attendance modules",
      "Exam, results and report generation",
      "Centralised institution data",
    ],
    results: [
      "Replaces scattered spreadsheets with one system",
      "Deployed and onboarded for real institutions",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "ERP"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
  {
    slug: "workflow-automation-bots",
    title: "Workflow Automation Bots",
    subtitle: "Python Automation & Scripting",
    categories: ["automation"] as ProjectCategory[],
    featured: false,
    tagline:
      "Scripts and bots that automate reporting, data processing and repetitive office tasks.",
    problem:
      "Teams burn hours on repetitive manual work — data entry, report generation and file processing.",
    solution:
      "A set of Python automation scripts and bots that process data, generate reports, send notifications and integrate services — removing the manual grind.",
    features: [
      "Automated data processing & reporting",
      "Scheduled tasks and notifications",
      "Service / API integrations",
      "Excel & file-processing automation",
    ],
    results: [
      "Cuts hours of manual work to seconds",
      "Reliable, repeatable, error-free runs",
    ],
    tech: ["Python", "Pandas", "Automation", "APIs", "OpenPyXL"],
    github: "https://github.com/katturwaromkar",
    demo: null,
  },
] as const;

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "web", label: "Web" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "automation", label: "Automation" },
] as const;

// ---------------------------------------------------------------------------
// EDUCATION
// ---------------------------------------------------------------------------
export const education = [
  {
    degree: "B.Tech — Computer Science & Engineering (Artificial Intelligence)",
    institute: "PCET's NCER (Nutan College of Engineering & Research), Pune",
    period: "2022 — 2026",
    score: "CGPA 7.2",
  },
  {
    degree: "HSC (12th)",
    institute: "Janta Junior College, Naigaon, Nanded",
    period: "2021 — 2022",
    score: "90.17%",
  },
  {
    degree: "SSC (10th)",
    institute: "Blue Bells English Medium School, Naigaon, Nanded",
    period: "2019 — 2020",
    score: "91.80%",
  },
] as const;

// ---------------------------------------------------------------------------
// CERTIFICATIONS
// ---------------------------------------------------------------------------
export const certifications = [
  { name: "Python Programming", org: "AI Adventure, Pune" },
  { name: "Frontend Development", org: "LinkedIn Learning" },
  { name: "Communication Skills", org: "TCS iON" },
  { name: "Machine Learning Foundations", org: "Online" },
  { name: "REST API Development", org: "Online" },
] as const;

// ---------------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------------
export const services = [
  {
    title: "AI Solutions",
    icon: "brain",
    desc: "Custom ML/NLP/CV systems — from data pipelines to deployed, scalable models and LLM-powered apps.",
  },
  {
    title: "Full-Stack Development",
    icon: "code",
    desc: "End-to-end web apps with Python/Django backends, REST APIs and modern React/Next.js frontends.",
  },
  {
    title: "ERP Development",
    icon: "boxes",
    desc: "ERP implementation, customisation and onboarding for institutions — with real client-success experience.",
  },
  {
    title: "Automation Solutions",
    icon: "workflow",
    desc: "Scripts and services that remove manual work — data processing, reporting and integration automation.",
  },
  {
    title: "Web Development",
    icon: "globe",
    desc: "Fast, responsive, accessible websites with clean architecture and premium UI/UX.",
  },
  {
    title: "Consulting",
    icon: "lightbulb",
    desc: "Technical guidance on AI feasibility, architecture and bringing a prototype to production.",
  },
] as const;

// ---------------------------------------------------------------------------
// ACHIEVEMENTS / STATS
// ---------------------------------------------------------------------------
export const stats = [
  { value: 4, suffix: "+", label: "Core Projects" },
  { value: 3, suffix: "+", label: "Internships" },
  { value: 5, suffix: "+", label: "Certifications" },
  { value: 76, suffix: "%", label: "JEE Percentile" },
] as const;

// ---------------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------------
// Real, SEO-friendly routes. `home` anchors to the top of the landing page;
// the rest are standalone, separately-indexed pages.
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;
