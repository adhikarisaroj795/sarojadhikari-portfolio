import { profile } from "../../data/profile";

const YEAR = new Date().getFullYear();

export default function Footer({ onOpenTerminal }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted md:px-8">
        <p>
          © {YEAR} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-text"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={onOpenTerminal}
            className="hidden hover:text-text md:inline"
          >
            Press{" "}
            <kbd className="rounded border border-border px-1.5 font-mono text-xs">
              `
            </kbd>{" "}
            for a terminal
          </button>
        </div>
      </div>
    </footer>
  );
}
