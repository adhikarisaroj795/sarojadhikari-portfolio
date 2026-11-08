import { ArrowUpRight, Lock } from "lucide-react";
import { FEATURED, MORE_WORK } from "../../data/projects";
import BrowserFrame from "../ui/BrowserFrame";

function FeaturedCard({ project }) {
  const { title, kind, summary, tech, image, imagePosition, url } = project;

  return (
    <article className="group flex min-w-0 flex-col rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/40">
      <BrowserFrame
        src={image}
        alt={`${title} screenshot`}
        position={imagePosition}
      />

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${title}`}
              className="text-muted transition-colors hover:text-accent"
            >
              <ArrowUpRight className="size-5" />
            </a>
          ) : (
            <span
              title="Private system — no public link"
              className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
            >
              <Lock className="size-3" />
              Private
            </span>
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-accent">{kind}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {tech.map((item) => (
            <li
              key={item}
              className="rounded-md border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[11px] text-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function SmallCard({ project }) {
  const { title, summary, image, url } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex min-w-0 gap-4 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/40"
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-24 shrink-0 rounded-md sm:w-32 border border-border object-cover"
      />
      <div className="min-w-0 py-1">
        <h4 className="flex items-center gap-1 font-medium">
          <span className="truncate">{title}</span>
          <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </h4>
        <p className="mt-1 text-sm leading-snug text-muted">{summary}</p>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 pb-20 pt-10 md:scroll-mt-8">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Featured projects
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Production systems I designed and built. The dashboards are private, so
        the screenshots use blurred or test data.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {FEATURED.map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}
      </div>

      <h3 className="mt-16 text-xl font-semibold">More work</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MORE_WORK.map((project) => (
          <SmallCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
