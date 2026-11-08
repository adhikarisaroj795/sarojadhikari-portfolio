import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { COMMAND_NAMES, WELCOME, runCommand } from "./commands";

const TONE = {
  default: "text-text/90",
  muted: "text-muted",
  accent: "text-accent",
  error: "text-rose-300",
};

function downloadCv() {
  const a = document.createElement("a");
  a.href = profile.cvPath;
  a.download = "";
  a.click();
}

export default function Terminal({ open, onClose }) {
  const [entries, setEntries] = useState(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1); // position in history while using ↑/↓
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Focus the prompt when opened; give focus back to where it was on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    inputRef.current?.focus();
    return () => previous?.focus?.({ preventScroll: true });
  }, [open]);

  // Keep the newest output in view.
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const value = input.trim();
    const echo = { text: `$ ${value}`, tone: "prompt" };
    setInput("");
    setCursor(-1);
    if (!value) {
      setEntries((prev) => [...prev, echo]);
      return;
    }
    setHistory((h) => [...h, value]);

    const { lines, action } = runCommand(value);
    if (action === "clear") {
      setEntries([]);
      return;
    }
    setEntries((prev) => [...prev, echo, ...lines]);

    if (action === "close") onClose();
    if (action === "download-cv") downloadCv();
    if (action?.startsWith("goto:")) {
      onClose();
      document
        .getElementById(action.slice(5))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "`") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = COMMAND_NAMES.filter((c) =>
        c.startsWith(input.trim().toLowerCase()),
      );
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) {
        setEntries((prev) => [
          ...prev,
          { text: matches.join("   "), tone: "muted" },
        ]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button
        type="button"
        aria-label="Close terminal"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio terminal"
        className="terminal-drop absolute inset-x-0 top-0 mx-auto flex h-[55vh] max-w-4xl flex-col overflow-hidden border-x border-b border-border bg-[#070a0e]/98 shadow-2xl shadow-black/60 sm:rounded-b-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="font-mono text-xs text-muted">
            saroj@portfolio: ~
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="rounded p-1 text-muted transition-colors hover:text-text"
          >
            <X className="size-4" />
          </button>
        </div>

        <div
          ref={outputRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
        >
          {entries.map((entry, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap break-words ${TONE[entry.tone] ?? "text-text"}`}
            >
              {entry.tone === "prompt" ? (
                <>
                  <span className="text-accent">$</span>
                  {entry.text.slice(1)}
                </>
              ) : (
                entry.text
              )}
            </pre>
          ))}

          <form onSubmit={submit} className="flex items-center gap-2">
            <span className="text-accent">$</span>
            <label className="sr-only" htmlFor="terminal-input">
              Command
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="flex-1 bg-transparent text-text caret-accent outline-none focus-visible:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
