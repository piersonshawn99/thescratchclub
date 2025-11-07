"use client";

import React from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="ml-2 inline-flex items-center rounded-lg border border-neutral-300 px-3 py-1 hover:bg-neutral-50"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
