import {
  EDUCATION,
  EXPERIENCE,
  SKILLS,
  SUMMARY,
  TEACHING,
} from "../../data/about";

function Experience() {
  return (
    <ol className="space-y-10">
      {EXPERIENCE.map(({ id, period, role, company, points }) => (
        <li key={id} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <p className="pt-0.5 text-sm text-muted">{period}</p>
          <div>
            <h4 className="font-semibold">
              {role}
              <span className="font-normal text-muted">, {company}</span>
            </h4>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[15px] leading-relaxed text-muted marker:text-border">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
      <li className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <p className="pt-0.5 text-sm text-muted">{EDUCATION.period}</p>
        <div>
          <h4 className="font-semibold">{EDUCATION.degree}</h4>
          <p className="mt-1 text-[15px] text-muted">{EDUCATION.place}</p>
        </div>
      </li>
    </ol>
  );
}

function Skills() {
  return (
    <dl className="space-y-5">
      {SKILLS.map(({ group, items }) => (
        <div key={group}>
          <dt className="text-sm font-semibold">{group}</dt>
          <dd className="mt-1 text-[15px] leading-relaxed text-muted">
            {items.join(", ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function About() {
  const { title, place, text, photo } = TEACHING;

  return (
    <section id="about" className="scroll-mt-20 border-t border-border py-20">
      <h2 className="font-display text-4xl font-bold tracking-tight">About</h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-text/85">
          {SUMMARY.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
          <img
            src={photo}
            alt="Saroj teaching a Git and GitHub class at KIST College"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="p-5">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted">{place}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </figcaption>
        </figure>
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h3 className="font-display text-2xl font-bold">Experience</h3>
          <div className="mt-8">
            <Experience />
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">Skills</h3>
          <div className="mt-8">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
}
