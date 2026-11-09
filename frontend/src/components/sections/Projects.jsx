import { ArrowUpRight } from "lucide-react";
import { FEATURED, MORE_WORK } from "../../data/projects";
import BrowserFrame from "../ui/BrowserFrame";

// FEATURED order: kheti-crm, bank-loan, messaging, addgandaki
const [crm, bank, messaging, addgandaki] = FEATURED;

const tile =
  "flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-3";

function MainTile() {
  return (
    <article className={`${tile} lg:col-span-4 lg:row-span-2`}>
      <BrowserFrame src={crm.image} alt="Kheti CRM dashboard (blurred data)" />
      <div className="grid gap-6 px-3 pb-3 pt-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm text-accent">Main project, 2024 to now</p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Kheti CRM and bank loan platform
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            Two connected systems I built and run on my own. Field staff collect
            farmer KYC and loan orders in the CRM; a commercial bank verifies
            and approves them through maker, checker and finalizer steps.
          </p>
        </div>
        <div>
          <ul className="space-y-2 text-sm text-text/85">
            <li>8 user roles with their own permissions</li>
            <li>CRM to bank sync with idempotent APIs</li>
            <li>Docker and Nginx deployment, CIS-hardened</li>
            <li>Real-time chat for staff and 10,000+ farmers</li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            React, Node.js, MongoDB, Socket.IO, Docker
          </p>
        </div>
      </div>
    </article>
  );
}

function Tile({ project, className = "" }) {
  return (
    <article className={`${tile} ${className}`}>
      <BrowserFrame
        src={project.image}
        alt={`${project.title} screenshot`}
        position={project.imagePosition}
      />
      <div className="px-3 pb-3 pt-5">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>
    </article>
  );
}

function WideTile({ project }) {
  return (
    <article
      className={`${tile} lg:col-span-6 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center`}
    >
      <BrowserFrame src={project.image} alt={`${project.title} screenshot`} />
      <div className="px-3 pb-3 pt-5 lg:px-8 lg:py-3">
        <h3 className="font-display text-2xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-4 text-sm text-accent">{project.kind}</p>
        <p className="mt-1 text-sm text-muted">{project.tech.join(", ")}</p>
      </div>
    </article>
  );
}

function SiteCard({ site }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className={`${tile} group transition-colors hover:border-muted/60`}
    >
      <BrowserFrame src={site.image} alt={`${site.title} screenshot`} />
      <div className="flex items-start justify-between gap-3 px-3 pb-2 pt-4">
        <div className="min-w-0">
          <h3 className="font-medium">{site.title}</h3>
          <p className="mt-1 text-sm leading-snug text-muted">{site.summary}</p>
        </div>
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted group-hover:text-text" />
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-border py-20"
    >
      <h2 className="font-display text-4xl font-bold tracking-tight">Work</h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-6">
        <MainTile />
        <Tile project={bank} className="lg:col-span-2" />
        <Tile project={messaging} className="lg:col-span-2" />
        <WideTile project={addgandaki} />
      </div>

      <h3 className="mt-16 font-display text-2xl font-bold">
        Other sites I&apos;ve built
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MORE_WORK.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </section>
  );
}
