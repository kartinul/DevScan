import type { Candidate } from "./types";

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "kartik",
    name: "Kartik Sharma",
    filename: "kartik_sharma_resume.pdf",
    github: "kartikdev",
    score: 78,
    verdict: "Strong Signal",
    verdictVariant: "strong",
    stats: { commits: 847, repos: 12, stars: 234, activeMo: 18 },

    claims: [
      {
        category: "Experience",
        text: "3+ years React",
        quote: '"3+ years of professional React experience in production"',
        verdict: "verified",
        confidence: 5,
        evidence: [
          "ecomm-dashboard (26 months of commits)",
          "ecomm-ui (11 months)",
          "340+ React commits across repos",
        ],
      },
      {
        category: "Skill",
        text: "TypeScript — Expert",
        quote: '"Expert-level TypeScript"',
        verdict: "partial",
        confidence: 3,
        evidence: [
          "38% of code is TypeScript",
          "Mostly typed JSX props — few advanced generics found",
        ],
      },
      {
        category: "Skill",
        text: "Python / FastAPI",
        quote: '"Python backend development with FastAPI"',
        verdict: "verified",
        confidence: 4,
        evidence: [
          "ml-data-pipeline (FastAPI, 8 months active)",
          "scraper-toolkit (Python, 4 months)",
        ],
      },
      {
        category: "Skill",
        text: "Kubernetes & Terraform",
        quote: '"Proficient in Kubernetes and Terraform"',
        verdict: "missing",
        confidence: 0,
        evidence: [],
      },
      {
        category: "Project",
        text: "E-commerce — 50k users",
        quote: '"Architected platform serving 50,000+ monthly users"',
        verdict: "inflated",
        confidence: 2,
        evidence: [
          "ecomm-dashboard exists (★48, solo)",
          "No load config, analytics, or infra code found",
          "README has no scale mention",
        ],
      },
      {
        category: "Skill",
        text: "GraphQL API design",
        quote: '"GraphQL API design and implementation"',
        verdict: "partial",
        confidence: 2,
        evidence: [
          "1 repo uses Apollo Client (consumer only)",
          "No backend schema or resolvers authored",
        ],
      },
      {
        category: "Extra",
        text: "Rust (not on resume)",
        quote: "— Not mentioned in resume —",
        verdict: "bonus",
        confidence: 5,
        evidence: [
          "cli-todo-rust (★82, 6 months active)",
          "Shows initiative beyond stated skills",
        ],
      },
      {
        category: "Experience",
        text: "Led team of 5 engineers",
        quote: '"Led cross-functional team of 5 engineers"',
        verdict: "missing",
        confidence: 0,
        evidence: [],
      },
    ],

    skills: [
      { name: "React", resumePct: 95, githubPct: 88, verdict: "verified" },
      { name: "TypeScript", resumePct: 90, githubPct: 62, verdict: "partial" },
      { name: "Python", resumePct: 80, githubPct: 76, verdict: "verified" },
      { name: "Node.js", resumePct: 75, githubPct: 55, verdict: "partial" },
      { name: "GraphQL", resumePct: 70, githubPct: 18, verdict: "inflated" },
      { name: "Kubernetes", resumePct: 65, githubPct: 0, verdict: "missing" },
    ],

    repos: [
      {
        name: "ecomm-dashboard",
        lang: "TypeScript",
        stars: 48,
        months: 26,
        claimMatches: ["React", "TypeScript"],
      },
      {
        name: "ml-data-pipeline",
        lang: "Python",
        stars: 17,
        months: 8,
        claimMatches: ["Python", "FastAPI"],
      },
      {
        name: "cli-todo-rust",
        lang: "Rust",
        stars: 82,
        months: 6,
        claimMatches: [],
      },
    ],

    flags: [
      {
        type: "red",
        title: "Scale claim unverifiable",
        desc: "50k-user claim has no backing — no analytics, CDN config, or infra code in any repo.",
      },
      {
        type: "red",
        title: "Team lead claim unsupported",
        desc: "All public repos are solo or 2-person max. Zero PR review history to external contributors.",
      },
      {
        type: "warn",
        title: 'TypeScript depth shallower than "expert"',
        desc: "Claim doesn't match code patterns — mostly typed props, minimal advanced utility types.",
      },
      {
        type: "green",
        title: "Unprompted Rust (★82)",
        desc: "CLI tool not on resume — signals initiative and shipping instinct beyond stated skills.",
      },
    ],

    summary: [
      { type: "bold", content: "Kartik" },
      { type: "text", content: " is a " },
      { type: "green", content: "credible mid-level fullstack developer" },
      {
        type: "text",
        content:
          " whose GitHub broadly supports the core resume claims — but with notable gaps. React and Python are ",
      },
      { type: "green", content: "well-evidenced" },
      {
        type: "text",
        content: " across multiple repos and 26+ months of consistent commits.",
      },
      { type: "break" },
      {
        type: "red",
        content:
          'Kubernetes, Terraform, and the "team lead" claims have zero GitHub evidence.',
      },
      {
        type: "text",
        content:
          " The 50k-user project claim appears inflated — the repo exists but has no scale indicators. ",
      },
      {
        type: "warn",
        content: 'TypeScript is present but shallower than "expert" implies.',
      },
      { type: "break" },
      {
        type: "text",
        content:
          "Notable upside: an unprompted Rust project with 82 stars suggests genuine curiosity and shipping ability beyond the day job.",
      },
    ],
  },

  {
    id: "priya",
    name: "Priya Mehta",
    filename: "priya_mehta_cv.pdf",
    github: "priya-codes",
    score: 91,
    verdict: "Excellent Signal",
    verdictVariant: "strong",
    stats: { commits: 1240, repos: 22, stars: 610, activeMo: 30 },

    claims: [
      {
        category: "Skill",
        text: "ML Eng — PyTorch & HuggingFace",
        quote: '"3 years ML engineering with PyTorch and HuggingFace"',
        verdict: "verified",
        confidence: 5,
        evidence: [
          "bert-finetuner (PyTorch, 14 months, ★210)",
          "vision-clf (★210, HuggingFace)",
          "600+ ML commits across 3 years",
        ],
      },
      {
        category: "Experience",
        text: "5+ years Python",
        quote: '"5+ years Python development"',
        verdict: "verified",
        confidence: 5,
        evidence: [
          "GitHub account 5.5 years old",
          "Python present throughout entire history",
        ],
      },
      {
        category: "Project",
        text: "Open source contributor",
        quote: '"Active open source contributor"',
        verdict: "verified",
        confidence: 5,
        evidence: [
          "47 PRs merged to external repos",
          "Contributions to scikit-learn and transformers",
        ],
      },
      {
        category: "Skill",
        text: "AWS SageMaker / MLOps",
        quote: '"AWS SageMaker and MLOps pipeline experience"',
        verdict: "partial",
        confidence: 2,
        evidence: [
          "1 repo references boto3",
          "No SageMaker config or pipeline orchestration found",
        ],
      },
      {
        category: "Skill",
        text: "Docker & CI/CD",
        quote: '"Dockerized microservices with CI/CD"',
        verdict: "verified",
        confidence: 4,
        evidence: [
          "Dockerfiles in 8 repos",
          "GitHub Actions workflows in 11 repos",
        ],
      },
    ],

    skills: [
      { name: "Python", resumePct: 95, githubPct: 92, verdict: "verified" },
      { name: "PyTorch", resumePct: 90, githubPct: 85, verdict: "verified" },
      { name: "Docker", resumePct: 80, githubPct: 78, verdict: "verified" },
      { name: "AWS/MLOps", resumePct: 75, githubPct: 28, verdict: "partial" },
      { name: "React", resumePct: 50, githubPct: 45, verdict: "verified" },
    ],

    repos: [
      {
        name: "bert-finetuner",
        lang: "Python",
        stars: 210,
        months: 14,
        claimMatches: ["PyTorch", "ML"],
      },
      {
        name: "vision-clf",
        lang: "Python",
        stars: 210,
        months: 10,
        claimMatches: ["PyTorch", "HuggingFace"],
      },
      {
        name: "data-eng-toolkit",
        lang: "Python",
        stars: 88,
        months: 18,
        claimMatches: ["Python", "Docker"],
      },
    ],

    flags: [
      {
        type: "warn",
        title: "AWS/MLOps depth unclear",
        desc: "Stated as core competency but only boto3 references found. SageMaker absent from all repos.",
      },
      {
        type: "green",
        title: "Exceptional open source record",
        desc: "47 merged PRs to scikit-learn and HuggingFace transformers is rare and extremely high-signal.",
      },
      {
        type: "green",
        title: "30-month consistent streak",
        desc: "No activity gap > 2 weeks across visible history. Extremely consistent contributor pattern.",
      },
    ],

    summary: [
      { type: "bold", content: "Priya" },
      { type: "text", content: " is a " },
      { type: "green", content: "highly credible ML engineer" },
      {
        type: "text",
        content:
          " — one of the stronger profiles audited. Python and PyTorch claims are ",
      },
      { type: "green", content: "deeply backed" },
      {
        type: "text",
        content:
          " with years of commit history, two 200+ star repos, and real contributions to major libraries.",
      },
      { type: "break" },
      { type: "warn", content: "AWS/MLOps is the one soft spot:" },
      {
        type: "text",
        content:
          " stated as a core competency but barely visible in public code. Worth probing in interview.",
      },
      { type: "break" },
      { type: "text", content: "Resume actually " },
      { type: "bold", content: "undersells" },
      {
        type: "text",
        content:
          " rather than oversells — her open source footprint is stronger than the resume communicates. Strong hire signal.",
      },
    ],
  },
];

export const GH_MOCK_USERS = [
  "kartinul",
  "priya-codes",
  "rahul-m",
  "ananya42",
  "sid-codes",
];
