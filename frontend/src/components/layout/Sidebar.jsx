import { Mail } from "lucide-react";
import { NAV_IDS, NAV_ITEMS } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

import { SquareTerminal } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: profile.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

const YEAR = new Date().getFullYear();

function Logo({ className = "", onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className={`font-mono text-2xl font-bold text-accent ${className}`}
    >
      {profile.initials}_
    </a>
  );
}

export default function Sidebar({ onOpenTerminal }) {
  const { active, jumpTo } = useActiveSection(NAV_IDS);

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 flex-col border-r border-border bg-bg md:flex">
        <Logo className="px-7 pt-8" onClick={() => jumpTo("home")} />

        <nav aria-label="Main" className="mt-12 flex flex-col">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => jumpTo(id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 border-l-2 px-7 py-3 text-[15px] transition-colors ${
                  isActive
                    ? "border-accent bg-accent/5 text-text"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={1.75} />
                {label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto px-7 pb-8">
          <div className="flex gap-4 border-t border-border pt-6">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenTerminal}
            className="mt-5 flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
          >
            <SquareTerminal className="size-4" strokeWidth={1.75} />
            Press{" "}
            <kbd className="rounded border border-border px-1.5 font-mono text-[11px]">
              `
            </kbd>{" "}
            for terminal
          </button>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            © {YEAR} {profile.name}
            <br />
            Built with React & Node.js
          </p>
        </div>
      </aside>

      {/* Mobile */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur md:hidden">
        <Logo className="text-xl" onClick={() => jumpTo("home")} />
        <nav aria-label="Main" className="flex gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => jumpTo(id)}
              aria-label={label}
              aria-current={active === id ? "page" : undefined}
              className={`rounded-md p-2.5 ${
                active === id ? "bg-accent/10 text-accent" : "text-muted"
              }`}
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
