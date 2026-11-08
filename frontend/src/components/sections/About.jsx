import { GraduationCap, Presentation } from "lucide-react";
import {
  EDUCATION,
  EXPERIENCE,
  SKILLS,
  SUMMARY,
  TEACHING,
} from "../../data/about";

function Timeline() {
  return (
    <ol className="relative mt-6 space-y-10 border-l border-border pl-8">
      {EXPERIENCE.map(({ id, period, role, company, points }, i) => (
        <li key={id} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-[37px] top-1.5 size-3 rounded-full border-2 ${
              i === 0 ? "border-accent bg-accent" : "border-muted bg-bg"
            }`}
          />
          <p className="text-sm text-accent">{period}</p>
          <h4 className="mt-1 text-lg font-semibold">
            {role} <span className="font-normal text-muted">· {company}</span>
          </h4>
          <ul className="mt-3 space-y-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1 shrink-0 rounded-full bg-muted/60"
                />
                {point}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function TeachingCard() {
  const { title, place, text, photo } = TEACHING;
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-surface">
      <img
        src={photo}
        alt="Saroj teaching a Git and GitHub class at KIST College"
        loading="lazy"
        decoding="async"
        className="aspect-[16/9] w-full object-cover"
      />
      <figcaption className="p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-accent">
          <Presentation className="size-4" strokeWidth={1.75} />
          Teaching
        </p>
        <h4 className="mt-2 text-lg font-semibold">{title}</h4>
        <p className="text-sm text-muted">{place}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
      </figcaption>
    </figure>
  );
}

function Skills() {
  return (
    <div className="space-y-5">
      {SKILLS.map(({ group, items }) => (
        <div key={group}>
          <p className="text-sm font-medium">{group}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface px-2.5 py-1 text-[13px] text-text/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-border py-20 md:scroll-mt-8"
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h2>

      <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
        {SUMMARY.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <h3 className="text-xl font-semibold">Experience</h3>
          <Timeline />

          <h3 className="mt-14 text-xl font-semibold">Education</h3>
          <div className="mt-5 flex gap-4">
            <GraduationCap
              className="mt-0.5 size-5 shrink-0 text-accent"
              strokeWidth={1.75}
            />
            <div>
              <p className="font-medium">{EDUCATION.degree}</p>
              <p className="text-sm text-muted">
                {EDUCATION.place} · {EDUCATION.period}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <TeachingCard />
          <div>
            <h3 className="mb-5 text-xl font-semibold">Skills</h3>
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
}
