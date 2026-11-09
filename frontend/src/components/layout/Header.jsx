import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_IDS, NAV_ITEMS } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";

const LINKS = NAV_ITEMS.filter(({ id }) => id !== "home");

export default function Header() {
  const { active, jumpTo } = useActiveSection(NAV_IDS);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);

  // Show the border and background only after the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-bg/85 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#home"
          onClick={() => jumpTo("home")}
          className="flex items-center gap-3 font-display text-lg font-bold"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-accent/50 bg-accent/10 font-mono text-[13px] font-bold text-accent"
          >
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav
          aria-label="Main"
          className="flex items-center gap-5 text-sm sm:gap-8"
        >
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => jumpTo(id)}
              aria-current={active === id ? "page" : undefined}
              className={
                active === id
                  ? "text-text"
                  : "text-muted transition-colors hover:text-text"
              }
            >
              {label}
            </a>
          ))}
          <a
            href={profile.cvPath}
            download
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-text transition-colors hover:border-muted"
          >
            CV
            <Download className="size-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
