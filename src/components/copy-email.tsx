"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(email).then(
          () => {
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1600);
          },
          () => {},
        );
      }}
      aria-live="polite"
      className="button-md rounded-full border border-cream/30 px-6 py-3 font-mono transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:bg-cream/10"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
