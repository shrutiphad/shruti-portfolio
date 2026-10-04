export const profile = {
  name: "Shruti Phad",
  role: "GTM Engineer",
  location: "Mumbai, India",
  email: "shrutiphadwork@gmail.com",
  phone: "+91 88794 59512",
  linkedin: "https://www.linkedin.com/in/shruti-phad-7901aa325/",
  github: "https://github.com/shrutiphad",
  x: "https://x.com/ShrutiPhad",
  substack: "https://substack.com/@whyshruti",
  site: "https://shrutiphad.tech",
};

/* The line from the blueprint. It is the whole positioning in six words. */
export const hero = {
  line: "I build the layer no-code stops at.",
  lede: "The pipelines, agents and attribution behind revenue and the software underneath them.",
};

/* ------------------------------------------------------------------
   About — merged with "what I do". Four capabilities, each with its
   own schematic, its own four-move flow and its own tools.
------------------------------------------------------------------ */

export const about = {
  kicker: "Most revenue problems look like sales problems",
  origin: [
    { year: "2022", label: "Electronics" },
    { year: "2024", label: "Full stack" },
    { year: "2025", label: "Automation" },
    { year: "2026", label: "GTM engineering" },
  ],
  facts: [
    { k: "Works in", v: "GTM & software engineering" },
    { k: "Thinks in", v: "Products, people & systems" },
    { k: "Studied", v: "Electronics · AI/ML honours" },
    { k: "Argues in", v: "Funnels, not adjectives" },
  ],
};

export const capabilities = [
  {
    index: "01",
    key: "gtm",
    title: "GTM engineering",
    accent: "blue",
    diagram: "circuit",
    claim: "Where deals die, not where leads came from",
    flow: ["Enrich", "Score", "Route", "Compound"],
    note: "A technically perfect system reps ignore has failed.",
    diagramLabels: [
      "ENRICH",
      "SCORE",
      "ROUTE",
      "COMPOUND",
      "ATTRIBUTION",
      "FUNNEL INSTRUMENTATION",
      "INTENT SCORING",
    ],
  },
  {
    index: "02",
    key: "software",
    title: "Software engineering",
    accent: "blue-soft",
    diagram: "stack",
    claim: "The layer no-code stops at",
    flow: ["Schema", "Service", "Interface", "Second month"],
    note: "Determinism in code, judgment in the model.",
    diagramLabels: [
      "INTERFACE · NEXT.JS / REACT",
      "SERVICE · FASTAPI / NODE",
      "STORE · POSTGRES / SUPABASE",
      "ROW-LEVEL SECURITY",
      "MULTI-TENANT SAAS",
      "REST & WEBHOOKS",
    ],
  },
  {
    index: "03",
    key: "ai",
    title: "Applied AI",
    accent: "green",
    diagram: "agentflow",
    claim: "Agents with an audit trail, not demos",
    flow: ["Free text", "Extract", "Validate", "Write back"],
    note: "Structured output over prose. A prompt can be talked out of a rule.",
    diagramLabels: [
      "FREE TEXT",
      "LANGGRAPH / LANGCHAIN",
      "EXTRACT",
      "PYDANTIC VALIDATION",
      "RAG / PGVECTOR",
      "NL-TO-SQL",
      "SCHEMA CHECKS & RETRIES",
      "WRITE BACK WITH AN AUDIT TRAIL",
    ],
  },
  {
    index: "04",
    key: "thinking",
    title: "Product thinking",
    accent: "red",
    diagram: "loopcheck",
    claim: "Name the metric before writing the pipeline",
    flow: ["Problem", "Hypothesis", "Smallest build", "Did it move"],
    note: "Find the constraint, not the complaint.",
    diagramLabels: [
      "PROBLEM",
      "HYPOTHESIS",
      "TAM / SAM / SOM",
      "MVP SCOPING",
      "DID IT MOVE",
    ],
  },
];

/* ------------------------------------------------------------------
   Experience
------------------------------------------------------------------ */

export const experience = [
  {
    company: "HaTa Bevtech Pvt. Ltd. (Hugg)",
    short: "Hugg",
    role: "Ex Product Engineer",
    period: "Jul 2026 · Previous role",
    place: "Mumbai",
    diagram: "attribution",
    accent: "blue",
    caption: "Three channels, one attributed order, no hand assembly",
    metrics: [
      { value: "600+", label: "conversations / day instrumented" },
      { value: "4", label: "product lines, one taxonomy" },
      { value: "3", label: "channels merged into one trace" },
      { value: "0", label: "manual steps in the daily report" },
    ],
    diagramLabels: [
      "WHATSAPP / INSTAGRAM / MESSENGER",
      "N8N → SUPABASE PIPELINE",
      "SAGEPILOT",
      "RAZORPAY WEBHOOKS",
      "TICKET ROUTING & ESCALATION",
      "DAILY REPORT",
      "COD FRICTION",
    ],
  },
  {
    company: "InLighnX Global Pvt. Ltd.",
    short: "InLighnX",
    role: "AI / ML Intern",
    period: "Apr 2025 — May 2025",
    place: "Remote",
    diagram: "vision",
    accent: "blue",
    caption: "Webcam to text, live, without a lab",
    metrics: [
      { value: "90%", label: "recognition accuracy" },
      { value: "live", label: "gesture-to-text translation" },
    ],
    diagramLabels: [
      "WEBCAM · LIVE FRAMES",
      "MEDIAPIPE LANDMARKS",
      "OPENCV PRE-PROCESSING",
      "CNN PIPELINE",
      "AUGMENTED TRAINING SET",
      "TEXT · 90% ACCURATE",
    ],
  },
];

/* ------------------------------------------------------------------
   Beyond the stack — the part that is not code
------------------------------------------------------------------ */

export const leadership = {
  headline: "The part that isn't code",
  note: "Two cells, chaired and run. Rooms booked, people scheduled, speakers chased, copy edited, budgets argued. The engineering is the easy half.",
  metrics: [
    { value: "300+", label: "live audience, AI-360 panel moderated" },
    { value: "3+", label: "departments coordinated across" },
    { value: "2", label: "institute bodies led at once" },
    { value: "2022–26", label: "RGIT Mumbai · CGPA 8.35" },
  ],
  roles: [
    {
      org: "Women's Development Cell, RGIT",
      role: "Chairperson",
      period: "2025 — 2026",
      accent: "red",
      chips: ["Institute-wide programming", "3+ departments", "Budget & sponsorship", "Team of volunteers"],
    },
    {
      org: "IEEE, RGIT",
      role: "General Secretary",
      period: "2025 — 2026",
      accent: "purple",
      chips: ["COGNIZANCE 2025 — editor", "AI-360 panel — moderator", "IDEATHON'25 — MVP + TAM/SAM/SOM"],
    },
    {
      org: "Rajiv Gandhi Institute of Technology",
      role: "B.E. Electronics & Telecommunication",
      period: "2022 — 2026",
      accent: "green",
      chips: ["Honours in AI & ML", "CGPA 8.35"],
    },
  ],
  skills: [
    "Stakeholder management",
    "Public speaking",
    "Moderating a panel",
    "Cross-functional coordination",
    "Editorial judgement",
    "Event operations",
    "Negotiation",
    "Mentoring",
    "Running a meeting that ends",
  ],
};

export const education = {
  school: "Rajiv Gandhi Institute of Technology, Mumbai",
  degree: "B.E. Electronics & Telecommunication — Honours in AI & ML",
  period: "2022 — 2026",
  detail: "CGPA 8.35",
};

/* ------------------------------------------------------------------
   Projects
------------------------------------------------------------------ */

export const projects = [
  {
    slug: "revenue-attribution-pipeline",
    diagram: "attribution",
    title: "Revenue Attribution Pipeline",
    tagline: "One trace from first message to paid order, across three channels.",
    status: "In production",
    statusTone: "green",
    year: "2026",
    context: "HaTa Bevtech (Hugg)",
    stack: ["n8n", "Supabase", "Razorpay", "WhatsApp / Instagram / Messenger", "Sagepilot agent"],
    accent: "blue",
    links: {},
    metric: { value: "600+", label: "conversations / day" },
    summary:
      "The founders had conversation volume and they had revenue, and nothing credible connecting the two.",
    problem:
      "A person rebuilt the same daily report by hand every morning from three inboxes and a payments dashboard. It arrived late, it disagreed with itself week to week, and no one could say which channel or which conversation had produced an order.",
    build: [
      "Modelled the funnel first: the events worth capturing, the identity that stitches a WhatsApp thread to a Razorpay order, and a definition of an attributed sale everyone could sign off on.",
      "Scheduled n8n flows pulling conversations, agent handoffs and payment webhooks into Supabase, with ticket routing and escalation logic living in the pipeline rather than in someone's head.",
      "Instrumented the Sagepilot AI agent alongside human handling so both appear in the same trace and can be compared honestly.",
      "Built an intent and objection taxonomy over the same store, from multilingual chat across four product lines — so an objection could be counted against orders lost.",
      "Published the daily report off that store, so the number in the morning message and the number in the database are the same number.",
    ],
    outcome: [
      "600+ daily conversations across three channels flowing into one reproducible revenue trace.",
      "Manual assembly removed from the daily report entirely.",
      "Cash-on-delivery friction identified as the dominant blocker to first purchase — a checkout problem no sales script could fix.",
      "Channel and agent performance became a query instead of an argument.",
    ],
  },
  {
    slug: "hotel-receptionist",
    diagram: "hotel",
    title: "AI Phone Receptionist",
    tagline: "Two hotels, one tenant-isolated brain, sub-millisecond routing.",
    status: "Live",
    statusTone: "amber",
    year: "2026",
    context: "Capstone",
    stack: ["FastAPI", "Anthropic Claude", "PostgreSQL RLS", "asyncpg", "React + Vite", "Docker Compose"],
    accent: "blue",
    links: {
      github: "https://github.com/shrutiphad/Capstone",
      live: "https://capstone-2-mk4j.onrender.com",
    },
    metric: { value: "<1ms", label: "rules-first classification" },
    summary:
      "A multi-tenant operations platform for budget hotels: voice and text reception, bookings, and a plain-English window onto the property's own data.",
    problem:
      "Budget hotels lose bookings at the front desk — nobody picks up, nobody logs it, and the property management system is a place data goes to die rather than a place anyone asks questions of.",
    build: [
      "A two-stage message pipeline: a rules-based classifier answers in under a millisecond and only falls through to Claude when the rules are not confident — cost and latency spent where they earn their keep.",
      "Classified messages drop into asyncio task queues feeding workflow handlers, so a slow downstream call never blocks the reception path.",
      "Tenant isolation enforced in PostgreSQL with row-level security, not in application code — two seeded properties can never read each other's rows even if a query is wrong.",
      "NL-to-SQL over the property's own tables, so an operator asks for occupancy in English instead of learning the schema.",
      "A React + Vite console polling events and bookings on an eight-second cycle, with a mock OTA server standing in for rate and availability feeds.",
    ],
    outcome: [
      "Reception, bookings and reporting behind one multi-tenant service.",
      "The expensive model only runs on the messages the cheap path could not resolve.",
      "Tenant isolation is a database guarantee, not a code review promise.",
    ],
  },
  {
    slug: "debrief",
    diagram: "agent",
    title: "Debrief",
    tagline: "An agentic CRM for pharma field reps who talk faster than they type.",
    status: "Live",
    statusTone: "amber",
    year: "2026",
    context: "Personal build",
    stack: ["LangGraph", "Groq Llama-3", "React", "FastAPI", "PostgreSQL", "Docker Compose"],
    accent: "green",
    links: { github: "https://github.com/shrutiphad/Debrief", live: "https://debrief-six-livid.vercel.app" },
    metric: { value: "5", label: "tools, one inspectable graph" },
    summary:
      "Field reps narrate a visit in a sentence. Debrief turns that sentence into structured CRM rows, and shows its working.",
    problem:
      "CRM hygiene fails at the last mile. A rep finishes a hospital visit and is asked to fill a form; the form loses to the next appointment, and the pipeline data rots.",
    build: [
      "A Groq Llama-3 agent extracts HCP sentiment, products discussed and follow-ups from free-text narration.",
      "An explicit LangGraph StateGraph with a MemorySaver checkpoint, ToolNode execution and conditional routing across five tools — so the agent's path is inspectable, not a black box.",
      "Dual entry paths, structured form and conversational chat, writing into one PostgreSQL schema with LLM summarisation and sentiment classification.",
      "Full audit trails and a live agent activity panel; Docker Compose deployment.",
    ],
    outcome: [
      "Visit logging collapses from a form to a sentence.",
      "Every automated write is traceable to the turn that produced it.",
      "One schema behind both entry paths, so reporting never has to reconcile two sources.",
    ],
  },
  {
    slug: "autodraft",
    diagram: "autodraft",
    title: "AutoDraft",
    tagline: "A request in English, a finished business document out.",
    status: "Live",
    statusTone: "amber",
    year: "2026",
    context: "Personal build",
    stack: ["FastAPI", "Groq", "Pydantic", "python-docx", "Tool calling"],
    accent: "amber",
    links: { github: "https://github.com/shrutiphad/AutoDraft" },
    metric: { value: "4", label: "stages, each schema-gated" },
    summary:
      "An agent that plans its own steps, calls tools for grounding, and renders a formatted .docx — with a validator between every stage.",
    problem:
      "Most document generators are one prompt and a prayer. The model invents figures, the structure drifts, and there is no point at which anything is checked.",
    build: [
      "A planner turns the request into an ordered task list with its assumptions written down, so the plan can be read before anything is drafted.",
      "An executor decides which tools to call — document template, client profile, market benchmark, current date — and drafts each section grounded in what came back.",
      "Every stage output is validated against a Pydantic schema before the next stage is allowed to run; a malformed plan fails loudly instead of quietly producing a bad document.",
      "A builder renders the validated content into a polished .docx with python-docx, plus an offline fallback mode so the pipeline is demonstrable without a key.",
    ],
    outcome: [
      "The document is grounded in tool output rather than model memory.",
      "Failures surface at the schema boundary, not in the finished file.",
      "Two demo cases, including a deliberately ambiguous multi-audience request.",
    ],
  },
  {
    slug: "uniplacement",
    diagram: "match",
    title: "UniPlacement",
    tagline: "Campus placement as a matching problem, not a spreadsheet.",
    status: "Live",
    statusTone: "amber",
    year: "2026",
    context: "Personal build",
    stack: ["Next.js 14", "Node & Express", "MongoDB", "JWT + RBAC", "GPT-4o-mini", "Cloudinary"],
    accent: "blue",
    links: {
      github: "https://github.com/shrutiphad/Uniplacement-AI",
      live: "https://uniplacement.vercel.app",
    },
    metric: { value: "2", label: "role-separated workflows" },
    summary:
      "An AI SaaS platform where admins run eligibility and students get told, specifically, what is missing from their profile.",
    problem:
      "Placement cells filter thousands of students against dozens of job descriptions by hand, and students find out they were ineligible after the fact, without being told why.",
    build: [
      "Role-based admin and student workflows behind JWT auth, with automated eligibility filtering and application tracking.",
      "A resume intelligence engine that extracts structured data from uploads, computes fit scores against the job description, and names the gaps.",
      "AI-backed recommendations for preparation guidance and resume customisation, with Cloudinary handling document storage.",
      "Next.js 14 on Vercel against an Express and MongoDB backend on Render.",
    ],
    outcome: [
      "Skill-to-JD matching replaces manual shortlisting.",
      "Students receive a specific gap list instead of a rejection.",
      "One platform holds the whole cycle: eligibility, applications, preparation.",
    ],
  },
  {
    slug: "sleepcare",
    diagram: "sleep",
    title: "SleepCare",
    tagline: "Five physiological sensors, streaming, classified in real time.",
    status: "Live",
    statusTone: "amber",
    year: "2026",
    context: "Final year project",
    stack: ["ESP32-S3", "Socket.IO", "1D-CNN", "ChromaDB RAG", "Supabase", "MERN"],
    accent: "red",
    links: {
      github: "https://github.com/shrutiphad/SleepCare-IoT",
      live: "https://sleep-care-io-t.vercel.app",
    },
    metric: { value: "5", label: "sensors on one live stream" },
    summary:
      "An IoT health system built around the harder half of the problem: getting a continuous signal to a browser without losing it.",
    problem:
      "Sleep data is only useful continuously, and continuous streams break — buffering, dropped sockets, clinicians looking at stale numbers.",
    build: [
      "An ESP32-S3 rig integrating five physiological sensors, streaming ten-second buffered windows for ECG cardiac event processing.",
      "A 1D-CNN arrhythmia classifier trained on the cardiac stream, with EEG-based sleep staging across Alpha, Beta, Gamma and RMS bands.",
      "Live Socket.IO broadcasting across four clinical modes with real-time alerting.",
      "RAG-based session querying over ChromaDB so a past night can be asked about in plain language, plus four Excel export pipelines.",
    ],
    outcome: [
      "Continuous multi-sensor telemetry surfaced live rather than after the fact.",
      "Arrhythmia detection and sleep staging computed on the stream, not in a batch job.",
      "Clinicians can query a past session in plain language and export it.",
    ],
  },
];

export const skills = {
  "Full stack": ["Next.js", "React", "JavaScript", "TypeScript", "FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Python", "SQL", "Java", "Docker", "Git", "Vercel", "Render", "AWS", "Linux"],
  "AI agents & automation": ["LangGraph", "LangChain", "Claude", "Groq", "RAG", "NL-to-SQL", "Pydantic", "pgvector", "ChromaDB", "OpenCV", "MediaPipe"],
  "GTM": ["Clay", "Claygent", "HubSpot", "SmartLead", "Apollo", "Slack", "n8n", "Supabase", "Make", "Zapier", "Instantly", "Sales Navigator"],
};
