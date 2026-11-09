import { useCallback, useEffect, useState } from "react";
import Terminal from "../terminal/Terminal";
import Footer from "./Footer";
import Header from "./Header";

// Typing ` inside a form field must type a backtick, not open the terminal.
const isTypingTarget = (el) =>
  el instanceof HTMLElement &&
  (el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

export default function Layout({ children }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "`" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !isTypingTarget(e.target)
      ) {
        e.preventDefault();
        setTerminalOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
      </main>
      <Footer onOpenTerminal={openTerminal} />
      <Terminal open={terminalOpen} onClose={closeTerminal} />
    </>
  );
}
