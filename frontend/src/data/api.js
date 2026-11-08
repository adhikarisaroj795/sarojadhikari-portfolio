// Responses shown in the hero's API window. Keep these true to the CV.
export const API_BASE = "api.sarojadhikari.info.np";

export const ENDPOINTS = [
  {
    path: "/me",
    ms: 38,
    body: {
      name: "Saroj Adhikari",
      role: "Full-Stack Developer",
      based_in: "Kathmandu, Nepal",
      open_to: ["relocation", "remote"],
      focus: "enterprise dashboards & APIs",
    },
  },
  {
    path: "/stack",
    ms: 41,
    body: {
      frontend: ["React", "TanStack Query", "Zustand", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Socket.IO", "Redis"],
      database: ["MongoDB", "Aggregation pipelines", "Indexing"],
      devops: ["Docker", "Nginx", "PM2", "GitHub Actions"],
    },
  },
  {
    path: "/experience",
    ms: 52,
    body: {
      total: "3+ years",
      latest: "Software Developer, Dv Excellus / Kheti",
      before: "Frontend Developer, Splendour Group",
      freelance: "Full-stack projects since 2023",
    },
  },
  {
    path: "/highlights",
    ms: 35,
    body: {
      built: "a CRM and a bank loan platform as sole developer",
      workflows: "maker → checker → finalizer approvals",
      integrations: "CRM ↔ bank sync with idempotent APIs",
      realtime: "Socket.IO chat and push notifications",
      deployed: "Docker + Nginx on bank-hosted servers",
    },
  },
];
