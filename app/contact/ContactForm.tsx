"use client";
import { useState } from "react";


export default function ContactForm() {
const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
const [message, setMessage] = useState<string>("");


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
setStatus("sent");
setMessage("Thanks—got it. We’ll be in touch.");
form.reset();
} else {
setStatus("error");
setMessage(json.error ?? "Something went wrong. Please try again.");
}
}


return (
<form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
<div>
<label className="block text-sm font-medium">Name</label>
<input name="name" required className="mt-1 w-full rounded-lg border p-3" />
</div>
<div>
<label className="block text-sm font-medium">Email</label>
<input name="email" type="email" required className="mt-1 w-full rounded-lg border p-3" />
</div>
<div>
<label className="block text-sm font-medium">Phone (optional)</label>
<input name="phone" className="mt-1 w-full rounded-lg border p-3" />
</div>
<div>
<label className="block text-sm font-medium">Message</label>
<textarea name="message" required rows={6} className="mt-1 w-full rounded-lg border p-3" />
</div>


<button
type="submit"
disabled={status === "sending"}
className="inline-flex items-center justify-center rounded-2xl border px-5 py-2.5 font-medium shadow-sm disabled:opacity-60"
>
{status === "sending" ? "Sending…" : "Send"}
</button>


{status !== "idle" && (
<p className={status === "error" ? "text-red-600" : "text-emerald-700"}>{message}</p>
)}
</form>
);
}