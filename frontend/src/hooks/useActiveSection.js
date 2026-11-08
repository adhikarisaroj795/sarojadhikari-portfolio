import { useCallback, useEffect, useRef, useState } from "react";

const SETTLE_MS = 120;

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const jumping = useRef(false);
  const settleTimer = useRef(0);

  const update = useCallback(() => {
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) {
      setActive(ids[ids.length - 1]);
      return;
    }
    const line = window.innerHeight * 0.4;
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    setActive(current);
  }, [ids]);

  // Resume tracking once scrolling has stopped.
  const scheduleSettle = useCallback(() => {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      jumping.current = false;
      update();
    }, SETTLE_MS);
  }, [update]);

  useEffect(() => {
    let frame = 0;
    const queueUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };
    const onScroll = () => {
      if (jumping.current) {
        scheduleSettle();
        return;
      }
      queueUpdate();
    };

    // A shared link like /#projects: React renders after the browser tried to
    // jump to the anchor, so jump to it ourselves once the sections exist.
    const hashId = window.location.hash.slice(1);
    if (ids.includes(hashId)) {
      document.getElementById(hashId)?.scrollIntoView({ behavior: "instant" });
    }
    queueUpdate(); // initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(settleTimer.current);
    };
  }, [ids, update, scheduleSettle]);

  const jumpTo = useCallback(
    (id) => {
      jumping.current = true;
      setActive(id);
      scheduleSettle(); // also unlocks if no scroll happens (already at the section)
    },
    [scheduleSettle],
  );

  return { active, jumpTo };
}
