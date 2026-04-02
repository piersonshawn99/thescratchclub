"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok) {
      form.reset();
      setStatus("sent");
      setMessage("Your message was sent successfully. Our team will contact you soon.");
    } else {
      setStatus("error");
      setMessage(json.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-emerald-900">
          Message sent successfully
        </h2>
        <p className="mt-3 text-base text-emerald-800">
          Your message was sent successfully. Our team will contact you soon.
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setMessage("");
            }}
            className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          placeholder="John Smith"
          required
          minLength={2}
          className="mt-1 w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <p className="mt-1 text-xs text-neutral-500">Please enter your full name.</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <p className="mt-1 text-xs text-neutral-500">We’ll only use this to reply to you.</p>
      </div>

      <div>
        <label className="block text-sm font-medium">Phone (optional)</label>
        <input
          name="phone"
          placeholder="(555) 123-4567"
          pattern="^[0-9 ()+-]*$"
          className="mt-1 w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          name="message"
          rows={6}
          placeholder="Tell us what’s on your mind..."
          required
          minLength={10}
          className="mt-1 w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Please include any details that help us understand your question.
        </p>
      </div>

      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-5 py-2.5 font-medium shadow-sm disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      {status === "error" && (
        <p className="pt-2 text-sm text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}