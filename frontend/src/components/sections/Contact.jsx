import { Check, Clock, Copy, MapPin } from "lucide-react";
import { useState } from "react";
import { profile } from "../../data/profile";
import ContactForm from "../contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-bg p-1.5 pl-4">
      <a
        href={`mailto:${profile.email}`}
        className="min-w-0 flex-1 truncate font-medium hover:text-accent"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text"
      >
        {copied ? (
          <Check className="size-4 text-accent" />
        ) : (
          <Copy className="size-4" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-20">
      <div className="grid gap-10 rounded-2xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="min-w-0">
          <h2 className="font-display text-4xl font-bold tracking-tight">
            Get in touch
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            I&apos;m open to full-stack and backend roles, on-site abroad or
            remote. Send a message or email me directly.
          </p>

          <div className="mt-8 max-w-md">
            <CopyEmail />
          </div>

          <ul className="mt-8 space-y-3 text-muted">
            <li className="flex items-center gap-3">
              <MapPin className="size-5" strokeWidth={1.75} />
              {profile.location}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5" strokeWidth={1.75} />
              Nepal Time (UTC+5:45)
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-muted"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-muted"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
