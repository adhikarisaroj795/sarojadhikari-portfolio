import { useCallback, useEffect, useState } from "react";
import Terminal from "../terminal/Terminal";
import Sidebar from "./Sidebar";

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
      <Sidebar onOpenTerminal={openTerminal} />
      <main className="overflow-x-clip pt-14 md:ml-56 md:pt-0">
        <div className="mx-auto max-w-6xl px-5 md:px-12 xl:px-16 2xl:max-w-7xl">
          {children}
        </div>
      </main>
      <Terminal open={terminalOpen} onClose={closeTerminal} />
    </>
  );
}
