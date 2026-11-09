import teachingPhoto from "../assets/teaching.webp";

export const SUMMARY = [
  "I’m a full-stack developer from Kathmandu with three years of experience building production web applications in React and Node.js. Most of my work is enterprise software — CRMs, loan-approval workflows and operational dashboards — where access control, data integrity and a clear audit trail matter.",
  "I’ve been the sole developer on systems used daily by banking and operations teams, which meant handling everything from MongoDB schemas and REST APIs to Docker deployments and server hardening",
];

// Write achievements in the past tense so they stay true after a job change.
export const EXPERIENCE = [
  {
    id: "dv-excellus",
    period: "Jun 2024 – Present",
    role: "Software Developer",
    company: "Dv Excellus / Kheti",
    points: [
      "Built the Kheti CRM and a connected bank loan-processing dashboard as sole developer, from data model to deployment.",
      "Designed maker → checker → finalizer approval workflows with role-based access for 8 user roles across both systems.",
      "Integrated the CRM with the bank’s loan APIs through a validated, idempotent gateway, and shipped real-time staff and farmer chat.",
      "Deployed to bank infrastructure with Docker and Nginx, set up CI/CD with GitHub Actions, and supported CIS-benchmark hardening.",
    ],
  },
  {
    id: "splendour",
    period: "Dec 2023 – Jun 2024",
    role: "Frontend Developer",
    company: "Splendour Group",
    points: [
      "Built responsive React interfaces and maintained existing web applications with designers and backend developers.",
    ],
  },
  {
    id: "freelance",
    period: "2023 – Present",
    role: "Freelance Full-Stack Developer",
    company: "Part-time",
    points: [
      "Delivered company websites and admin panels for clients in recruitment, agriculture and technology.",
    ],
  },
];

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      "React",
      "React Router",
      "Redux",
      "Zustand",
      "TanStack Query",
      "AG Grid",
      "Recharts",
      "Leaflet",
      "PWA",
      "Tailwind CSS",
      "SCSS",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "Socket.IO",
      "Redis",
      "Cron jobs",
      "Winston logging",
    ],
  },
  {
    group: "Database & Storage",
    items: ["MongoDB", "Mongoose", "Aggregation", "Indexing", "SQL", "AWS S3"],
  },
  {
    group: "Files & Reports",
    items: ["Multer", "Sharp", "PDF generation", "Excel export"],
  },
  {
    group: "DevOps",
    items: ["Docker", "Nginx", "PM2", "Ubuntu", "GitHub Actions", "Cloudflare"],
  },
  {
    group: "Security",
    items: ["JWT & RBAC", "bcrypt", "Helmet", "Rate limiting", "CIS hardening"],
  },
  {
    group: "Integrations",
    items: ["Bank APIs", "Rocket.Chat", "Firebase (FCM)", "Baato Maps"],
  },
];

export const TEACHING = {
  title: "10-day Git & GitHub course",
  place: "KIST College, Kathmandu",
  text: "Invited back by my college to teach version control and collaborative workflows to first-semester BIT students — commits, branching, pull requests and working as a team on GitHub.",
  photo: teachingPhoto,
};

export const EDUCATION = {
  degree: "Bachelor of Information Technology (BIT)",
  place: "KIST College, Kathmandu",
  period: "2018 – 2024",
};
