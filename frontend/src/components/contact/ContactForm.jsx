import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "../../data/profile";

const API_URL = import.meta.env.VITE_CONTACT_API ?? "/api/contact";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", message: "", website: "" };

// Client-side checks are for the user's convenience only; the backend re-validates.
function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(email.trim()))
    errors.email = "Enter a valid email address.";
  if (message.trim().length < 10)
    errors.message = "Write at least 10 characters.";
  if (message.length > 2000) errors.message = "Keep it under 2,000 characters.";
  return errors;
}

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-bg px-4 py-3 text-[15px] text-text placeholder:text-muted/60 outline-none transition-colors focus:border-accent ${
    hasError ? "border-rose-400/70" : "border-border"
  }`;

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website, // honeypot: must stay empty
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start rounded-xl border border-accent/30 bg-accent/5 p-8">
        <CircleCheck className="size-8 text-accent" strokeWidth={1.75} />
        <h3 className="mt-4 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted">
          Thanks for getting in touch. I usually reply within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          name="message"
          rows={6}
          value={form.message}
          onChange={onChange}
          placeholder="Tell me about the role or project"
          aria-invalid={Boolean(errors.message)}
          className={`${inputClass(errors.message)} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={onChange}
          />
        </label>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-rose-400/30 bg-rose-400/5 px-4 py-3 text-sm text-rose-200"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          <span>
            The message couldn’t be sent. Try again, or email me directly at{" "}
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
            .
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent/85 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-rose-300">{error}</span>
      )}
    </label>
  );
}
