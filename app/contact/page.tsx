"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact The Scratch Club</h1>
      <p className="mt-4 text-neutral-600">
        Have a question about memberships, coaching, or events? We’d love to hear from you.
      </p>

      {status === "sent" ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 p-6 text-emerald-800">
          <p>Thanks for reaching out — we’ll get back to you shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("sent");
          }}
          className="mt-8 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-neutral-700">
              Topic
            </label>
            <select
              id="topic"
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option>General question</option>
              <option>Memberships</option>
              <option>Coaching</option>
              <option>Events / Leagues</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-12 text-sm text-neutral-600">
        <p><strong>Email:</strong> info@scratchclubgolf.com</p>
        <p><strong>Address:</strong> Chilson Commons, Pinckney, MI 48169</p>
        <p><strong>Phone:</strong> (555) 555-5555</p>
      </div>
    </main>
  );
}
