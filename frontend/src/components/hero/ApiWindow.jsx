import { CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE, ENDPOINTS } from "../../data/api";
import { jsonLines } from "./jsonLines";
import { normalizePath, resolveRequest } from "./resolveRequest";

const LINE_MS = 45;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function ApiWindow() {
  const [path, setPath] = useState(ENDPOINTS[0].path); // last sent request
  const [draft, setDraft] = useState(ENDPOINTS[0].path); // what's in the input
  const [shown, setShown] = useState(0);

  const response = resolveRequest(path);
  const lines = jsonLines(response.body);
  const ok = response.status < 400;

  // Stream the response in line by line.
  useEffect(() => {
    if (shown >= lines.length) return;
    if (reducedMotion()) {
      const id = setTimeout(() => setShown(lines.length), 0);
      return () => clearTimeout(id);
    }
    const id = setTimeout(
      () => setShown((n) => n + 1),
      shown === 0 ? 250 : LINE_MS,
    );
    return () => clearTimeout(id);
  }, [shown, lines.length]);

  const send = (raw) => {
    const next = normalizePath(raw);
    setPath(next);
    setDraft(next);
    setShown(0); // re-sending the same path replays it, like a real request
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(draft);
  };

  const loading = shown === 0;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
      {/* Request bar */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3 border-b border-border px-4 py-3"
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]/80" />
          <span className="size-3 rounded-full bg-[#febc2e]/80" />
          <span className="size-3 rounded-full bg-[#28c840]/80" />
        </div>

        <label className="group flex min-w-0 flex-1 cursor-text items-center gap-2 rounded-md border border-border bg-bg/60 px-3 py-1.5 font-mono text-xs transition-colors focus-within:border-accent">
          <span className="font-semibold text-accent">GET</span>
          <span className="-mr-2 hidden shrink-0 text-muted sm:inline">
            {API_BASE}
          </span>
          <span className="sr-only">Request path</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            maxLength={80}
            className="min-w-0 flex-1 bg-transparent text-text outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            aria-label="Send request"
            className="shrink-0 rounded p-0.5 text-muted transition-colors hover:text-accent"
          >
            <CornerDownLeft className="size-3.5" />
          </button>
        </label>

        <span
          className="hidden shrink-0 font-mono text-xs sm:block"
          aria-live="polite"
        >
          {loading ? (
            <span className="text-muted">sending…</span>
          ) : (
            <>
              <span className={ok ? "text-accent" : "text-rose-400"}>
                {response.status} {response.statusText}
              </span>
              <span className="text-muted"> · {response.ms}ms</span>
            </>
          )}
        </span>
      </form>

      {/* Endpoint tabs */}
      <div className="flex items-center gap-1 border-b border-border px-3 py-2">
        <div
          role="tablist"
          aria-label="Endpoints"
          className="flex gap-1 overflow-x-auto"
        >
          {ENDPOINTS.map(({ path: p }) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={p === path}
              onClick={() => send(p)}
              className={`shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                p === path
                  ? "bg-accent/15 text-accent"
                  : "text-muted hover:bg-white/5 hover:text-text"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <span className="ml-auto hidden shrink-0 pl-3 text-[11px] text-muted/70 lg:block">
          Edit the URL and press Enter
        </span>
      </div>

      {/* Response */}
      <pre
        className="h-[260px] overflow-auto py-5 font-mono text-[13px] leading-7 2xl:text-sm"
        aria-label={`Response from ${path}`}
      >
        {lines.slice(0, shown).map((tokens, n) => (
          <div key={n} className="flex">
            <span className="w-12 shrink-0 select-none pr-4 text-right text-muted/40">
              {n + 1}
            </span>
            <code>
              {tokens.map((tok, k) => (
                <span key={k} className={tok.c}>
                  {tok.t}
                </span>
              ))}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
}
