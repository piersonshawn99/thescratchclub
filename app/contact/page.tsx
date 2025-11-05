"use client";

import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Contact Us</h1>
      <p className="mb-8 text-neutral-600">Questions about memberships, coaching, or leagues? Drop a note.</p>
      <ContactForm />
    </main>
  );
}

