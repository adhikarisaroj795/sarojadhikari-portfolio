import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "../../data/profile";
import ApiWindow from "../hero/ApiWindow";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-14 pb-8 pt-12 md:scroll-mt-0 lg:pt-20"
    >
      <div className="grid items-center gap-12 xl:grid-cols-[1fr_1.1fr] xl:gap-16">
        {/* Left: who I am */}
        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="flex items-center gap-2 text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to new roles
            </span>
            <span className="text-border" aria-hidden="true">
              |
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" strokeWidth={1.75} />
              {profile.location}
            </span>
          </p>

          <h1 className="mt-6 text-6xl font-bold leading-[0.92] tracking-tight sm:text-7xl 2xl:text-8xl">
            Saroj
            <br />
            Adhikari<span className="text-accent">.</span>
          </h1>

          <p className="mt-6 text-2xl font-semibold text-text/90 2xl:text-3xl">
            {profile.role}
          </p>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-base font-semibold text-bg transition-colors hover:bg-accent/85"
            >
              View my work
              <ArrowRight className="size-5" />
            </a>
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-accent/60 px-7 py-3.5 text-base font-semibold text-accent transition-colors hover:bg-accent/10"
            >
              <Download className="size-5" />
              Download CV
            </a>
          </div>
        </div>

        {/* Right: interactive API window */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-accent/10 blur-3xl"
          />
          <ApiWindow />
        </div>
      </div>

      {/* Stats bar */}
      <dl className="mt-16 grid grid-cols-3 divide-x divide-border border-y border-border py-8">
        {profile.stats.map(({ value, label }) => (
          <div key={label} className="px-2 text-center">
            <dt className="sr-only">{label}</dt>
            <dd className="text-4xl font-bold tracking-tight text-accent sm:text-5xl">
              {value}
            </dd>
            <dd className="mt-2 text-xs text-text/80 sm:text-base">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
