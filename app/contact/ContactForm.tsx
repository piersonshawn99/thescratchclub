"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      setStatus("sent");
      setMessage("Thanks—got it. We’ll be in touch.");
      e.currentTarget.reset();
    } else {
      setStatus("error");
      setMessage(json.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      {/* fields… */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" />
      <button type="submit" disabled={status === "sending"}>Send</button>
      {status !== "idle" && <p>{message}</p>}
    </form>
  );
}
