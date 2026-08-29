"use client";

import { useEffect, useState } from "react";

const email = "help@aiagenthelpline.com";

function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {copied ? (
        <path d="m4.5 10.5 3.4 3.4 7.6-8" />
      ) : (
        <>
          <rect x="6.5" y="3.5" width="10" height="11" rx="1" />
          <path d="M13.5 16.5h-9a1 1 0 0 1-1-1v-10" />
        </>
      )}
    </svg>
  );
}

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
  }

  return (
    <button className="email-button" type="button" onClick={copyEmail}>
      <span>{copied ? "Copied to clipboard" : email}</span>
      <CopyIcon copied={copied} />
    </button>
  );
}
