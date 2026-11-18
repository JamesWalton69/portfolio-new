"use client";

import { useEffect, useRef } from "react";

// Live Kolkata time. The server renders the build-time value so the static
// shell is stable; the effect corrects it on mount and every 15s after.
const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export function Clock() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (ref.current) ref.current.textContent = fmt.format(new Date());
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span ref={ref} suppressHydrationWarning>
      {fmt.format(new Date())}
    </span>
  );
}
