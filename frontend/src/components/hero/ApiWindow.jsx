import { Check, Copy, CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE, API_HOST, PATHS } from "../../data/api";
import { headerLines, jsonLines } from "./jsonLines";
import { normalizePath } from "./normalizePath";

const LINE_MS = 45;
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

const formatSize = (bytes) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;

const networkError = (ms) => ({
  status: 0,
  statusText: "Network error",
  ms,
  size: 0,
  headers: [],
  body: { success: false, error: "Could not reach the API. Please try again." },
});

export default function ApiWindow() {
  const [path, setPath] = useState(PATHS[0]); // last sent request
  const [draft, setDraft] = useState(PATHS[0]); // what's in the input
  const [nonce, setNonce] = useState(0); // re-sending the same path fetches again
  const [response, setResponse] = useState(null); // null while loading
  const [view, setView] = useState("body"); // 'body' | 'headers'
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);

  // Real request to the backend. Aborted if a newer request starts.
  useEffect(() => {
    const controller = new AbortController();
    const started = performance.now();
    const url = `${API_BASE}/api${path === "/" ? "" : path}`;

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        const text = await res.text();
        let body;
        try {
          body = JSON.parse(text);
        } catch {
          body = {
            success: false,
            error: res.ok
              ? "Response was not JSON"
              : `The API is unavailable right now (HTTP ${res.status}). Please try again later.`,
          };
        }
        setResponse({
          status: res.status,
          statusText: res.statusText || (res.ok ? "OK" : "Error"),
          ms: Math.round(performance.now() - started),
          size: new TextEncoder().encode(text).length,
          headers: [...res.headers.entries()],
          body,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setResponse(networkError(Math.round(performance.now() - started)));
      });

    return () => controller.abort();
  }, [path, nonce]);

  let lines = [];
  if (response)
    lines =
      view === "body"
        ? jsonLines(response.body)
        : headerLines(response.headers);

  // Stream the response in line by line once it has arrived.
  useEffect(() => {
    if (!response || shown >= lines.length) return;
    const delay = reducedMotion() ? 0 : LINE_MS;
    const id = setTimeout(
      () => setShown(reducedMotion() ? lines.length : (n) => n + 1),
      delay,
    );
    return () => clearTimeout(id);
  }, [response, shown, lines.length]);

  const send = (raw) => {
    const next = normalizePath(raw);
    setPath(next);
    setDraft(next);
    setNonce((n) => n + 1);
    setResponse(null);
    setShown(0);
  };

  const switchView = (next) => {
    if (next === view) return;
    setView(next);
    setShown(lines.length ? Number.MAX_SAFE_INTEGER : 0); // no replay animation on tab switch
  };

  const copy = async () => {
    if (!response) return;
    const text =
      view === "body"
        ? JSON.stringify(response.body, null, 2)
        : response.headers.map(([k, v]) => `${k}: ${v}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: ignore */
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(draft);
  };

  const ok = response && response.status > 0 && response.status < 400;
  const tabClass = (active) =>
    `shrink-0 rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
      active
        ? "bg-accent/15 text-accent"
        : "text-muted hover:bg-white/5 hover:text-text"
    }`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40">
      {/* Request bar */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-3 border-b border-border px-4 py-3"
      >
        <label className="group flex min-w-0 flex-1 cursor-text items-center gap-2 rounded-md border border-border bg-bg/60 px-3 py-1.5 font-mono text-xs transition-colors focus-within:border-accent">
          <span className="font-semibold text-accent">GET</span>
          <span className="-mr-2 hidden shrink-0 text-muted sm:inline">
            {API_HOST}
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
      </form>

      {/* Endpoint tabs */}
      <div
        role="tablist"
        aria-label="Endpoints"
        className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2"
      >
        {PATHS.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={p === path}
            onClick={() => send(p)}
            className={tabClass(p === path)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Response toolbar: Body / Headers, status, time, size, copy */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-3 py-2">
        <div role="tablist" aria-label="Response view" className="flex gap-1">
          <button
            type="button"
            role="tab"
            aria-selected={view === "body"}
            onClick={() => switchView("body")}
            className={tabClass(view === "body")}
          >
            Body
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "headers"}
            onClick={() => switchView("headers")}
            className={tabClass(view === "headers")}
          >
            Headers{response ? ` (${response.headers.length})` : ""}
          </button>
        </div>

        <span className="ml-auto font-mono text-xs" aria-live="polite">
          {!response ? (
            <span className="text-muted">sending…</span>
          ) : (
            <>
              <span className={ok ? "text-accent" : "text-rose-400"}>
                {response.status || "ERR"} {response.statusText}
              </span>
              <span className="text-muted">
                {" · "}
                {response.ms}ms
                {response.size ? ` · ${formatSize(response.size)}` : ""}
              </span>
            </>
          )}
        </span>

        <button
          type="button"
          onClick={copy}
          disabled={!response}
          aria-label={`Copy response ${view}`}
          className="rounded p-1 text-muted transition-colors hover:text-text disabled:opacity-40"
        >
          {copied ? (
            <Check className="size-3.5 text-accent" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>

      {/* Response */}
      <pre
        className="h-[260px] overflow-y-auto overflow-x-hidden py-5 pr-4 font-mono text-[13px] leading-7 2xl:text-sm"
        aria-label={`Response ${view} from ${path}`}
      >
        {lines.slice(0, shown).map((tokens, n) => (
          <div key={n} className="flex">
            <span className="w-12 shrink-0 select-none pr-4 text-right text-muted/40">
              {n + 1}
            </span>
            <code className="min-w-0 whitespace-pre-wrap break-words">
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
