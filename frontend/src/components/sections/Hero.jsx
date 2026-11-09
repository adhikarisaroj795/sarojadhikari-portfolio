import { Download } from "lucide-react";
import photo from "../../assets/saroj.webp";
import { profile } from "../../data/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="grid scroll-mt-20 items-center gap-12 pb-16 pt-10 lg:grid-cols-[1fr_auto] lg:gap-20 lg:pb-20 lg:pt-14"
    >
      <div className="min-w-0">
        <p className="text-sm text-muted">
          {profile.role}, {profile.location}
        </p>

        <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {profile.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.intro}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent/85"
          >
            See my work
          </a>
          <a
            href={profile.cvPath}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-muted"
          >
            <Download className="size-4" />
            Download CV
          </a>
        </div>

        <p className="mt-6 text-sm text-muted">{profile.availability}.</p>
      </div>

      <img
        src={photo}
        alt={profile.name}
        width="280"
        height="280"
        className="order-first size-28 rounded-2xl object-cover ring-1 ring-border lg:order-none lg:size-[280px]"
      />
    </section>
  );
}
