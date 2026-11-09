//  achievements in the past tense so they stay true after a job change.

export const PORTFOLIO = {
  me: {
    name: "Saroj Adhikari",
    role: "Full-Stack Developer",
    based_in: "Kathmandu, Nepal",
    open_to: ["relocation", "remote"],
    focus: "enterprise dashboards and the APIs behind them",
    site: "https://sarojadhikari.info.np",
  },
  stack: {
    frontend: ["React", "TanStack Query", "Zustand", "Redux", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Socket.IO", "Redis"],
    database: ["MongoDB", "Aggregation pipelines", "Indexing"],
    devops: ["Docker", "Nginx", "PM2", "GitHub Actions"],
  },
  experience: {
    total: "3+ years",
    latest: "Software Developer, Dv Excellus / Kheti",
    before: "Frontend Developer, Splendour Group",
    freelance: "Full-stack projects since 2023",
  },
  highlights: {
    built: "a CRM and a loan-approval platform as sole developer",
    workflows: "maker → checker → finalizer approvals",
    integrations: "CRM ↔ bank sync with idempotent APIs",
    realtime: "Socket.IO chat and push notifications",
    deployed: "Docker + Nginx on bank-hosted servers",
  },
};

export const ENDPOINTS = Object.keys(PORTFOLIO).map((key) => `/api/${key}`);
