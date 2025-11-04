"use client";
import { useState } from "react";
export default function ContactPage(){
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle"); const [error,setError]=useState<string|null>(null);
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){e.preventDefault(); setStatus("sending"); setError(null);
    const form=e.currentTarget; const data=Object.fromEntries(new FormData(form).entries());
    try{
      const res=await fetch("/api/contact",{method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({firstName:data.firstName,lastName:data.lastName,email:data.email,topic:data.topic,message:data.message})});
      const json=await res.json(); if(!res.ok||!json.ok) throw new Error(json.error||"Failed to send");
      setStatus("sent"); form.reset();
    }catch(err:any){ setStatus("error"); setError(err?.message||"Something went wrong"); }
  }
  return (<main className="mx-auto max-w-2xl px-6 py-16">
    <h1 className="text-3xl font-semibold tracking-tight">Contact / Directions</h1>
    <p className="mt-4 text-neutral-600">Questions about memberships, coaching, or events? Send a note and we’ll get right back.</p>
    <form onSubmit={onSubmit} className="mt-10 space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        <div><label className="block text-sm font-medium">First name</label>
          <input required name="firstName" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30"/></div>
        <div><label className="block text-sm font-medium">Last name</label>
          <input required name="lastName" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30"/></div>
      </div>
      <div><label className="block text-sm font-medium">Email</label>
        <input required type="email" name="email" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30"/></div>
      <div><label className="block text-sm font-medium">Topic</label>
        <select name="topic" className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30">
          <option>General question</option><option>Memberships</option><option>Coaching</option><option>Events / Leagues</option><option>Partnerships</option>
        </select></div>
      <div><label className="block text-sm font-medium">Message</label>
        <textarea required name="message" rows={6} className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/30"/></div>
      {status==="sent"?(<div className="rounded-xl bg-emerald-50 p-4 text-emerald-700">Thanks! We received your message.</div>)
        :status==="error"?(<div className="rounded-xl bg-red-50 p-4 text-red-700">Error: {error}</div>)
        :(<button type="submit" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" disabled={status==="sending"}>{status==="sending"?"Sending...":"Send Message"}</button>)}
    </form>
  </main>);
}