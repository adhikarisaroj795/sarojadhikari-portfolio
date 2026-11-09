import { EXPERIENCE, SKILLS } from "../../data/about";
import { NAV_IDS } from "../../data/navigation";
import { profile } from "../../data/profile";
import { FEATURED, MORE_WORK } from "../../data/projects";

const line = (text, tone = "default") => ({ text, tone });

const HELP = [
  ["help", "list commands"],
  ["whoami", "who I am"],
  ["projects", "featured and other work"],
  ["stack", "technologies I use"],
  ["experience", "where I have worked"],
  ["contact", "how to reach me"],
  ["cv", "download my CV"],
  ["goto <section>", `scroll to ${NAV_IDS.join(", ")}`],
  ["ls", "list sections"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];

const COMMANDS = {
  help: () => ({
    lines: [
      line("Available commands:", "muted"),
      ...HELP.map(([cmd, desc]) => line(`  ${cmd.padEnd(16)}${desc}`)),
    ],
  }),

  whoami: () => ({
    lines: [
      line(profile.name, "accent"),
      line(`${profile.role} · ${profile.location}`),
      line(profile.intro, "muted"),
    ],
  }),

  projects: () => ({
    lines: [
      line("Featured", "muted"),
      ...FEATURED.map((p) =>
        line(`  ${p.title.padEnd(34)}${p.url ? p.url : "(private)"}`),
      ),
      line("More work", "muted"),
      ...MORE_WORK.map((p) => line(`  ${p.title.padEnd(34)}${p.url}`)),
    ],
  }),

  stack: () => ({
    lines: SKILLS.map(({ group, items }) =>
      line(`${group.padEnd(20)}${items.join(", ")}`),
    ),
  }),

  experience: () => ({
    lines: EXPERIENCE.flatMap(({ period, role, company }) => [
      line(`${period.padEnd(22)}${role}, ${company}`),
    ]),
  }),

  contact: () => ({
    lines: [
      line(`email     ${profile.email}`, "accent"),
      line(`linkedin  ${profile.links.linkedin}`),
      line(`github    ${profile.links.github}`),
    ],
  }),

  cv: () => ({
    lines: [line("Downloading CV…", "accent")],
    action: "download-cv",
  }),

  ls: () => ({ lines: [line(NAV_IDS.join("   "))] }),

  goto: ([arg]) => {
    if (!NAV_IDS.includes(arg)) {
      return {
        lines: [
          line(
            `goto: unknown section "${arg ?? ""}". Try: ${NAV_IDS.join(", ")}`,
            "error",
          ),
        ],
      };
    }
    return { lines: [line(`→ ${arg}`, "muted")], action: `goto:${arg}` };
  },

  clear: () => ({ lines: [], action: "clear" }),
  exit: () => ({ lines: [], action: "close" }),

  neofetch: () => ({
    lines: [
      line("saroj@portfolio", "accent"),
      line("---------------"),
      line("Role      Full-stack developer"),
      line(`Location  ${profile.location}`),
      line("Shell     React 19 + Vite + Tailwind CSS"),
      line("Backend   Node.js + Express 5 on api.sarojadhikari.info.np"),
      line("Uptime    3+ years shipping production software"),
      line("Status    Open to relocation and remote roles", "accent"),
    ],
  }),

  coffee: () => ({
    lines: [
      line("     ( (", "muted"),
      line("      ) )", "muted"),
      line("   ........"),
      line("   |      |]"),
      line("   \\      /"),
      line("    `----'"),
      line("Brewing… this is how most of this site was built.", "muted"),
    ],
  }),

  sudo: (args) => {
    if (args.join(" ") === "hire saroj") {
      return {
        lines: [
          line("[sudo] password for recruiter: ********", "muted"),
          line("Access granted. Opening your email client…", "accent"),
        ],
        action: "hire",
      };
    }
    return {
      lines: [line("Nice try. This incident will be reported.", "error")],
    };
  },
};

export const COMMAND_NAMES = Object.keys(COMMANDS).filter((c) => c !== "sudo");

export function runCommand(input) {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return { lines: [] };
  const command = COMMANDS[name.toLowerCase()];
  if (!command) {
    return {
      lines: [
        line(`command not found: ${name}. Type "help" for a list.`, "error"),
      ],
    };
  }
  return command(args.map((a) => a.toLowerCase()));
}

export const WELCOME = [
  line(`${profile.name} — portfolio terminal`, "accent"),
  line('Type "help" to see what you can do. Press Esc or ` to close.', "muted"),
];
