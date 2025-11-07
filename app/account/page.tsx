"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const params = useSearchParams();
  const qpCustomer = params.get("customer");

  const [customerId, setCustomerId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Preload from query param or localStorage for convenience during early phases
    const stored = window.localStorage.getItem("stripe_customer_id") || "";
    const initial = qpCustomer || stored;
    if (initial) setCustomerId(initial);
  }, [qpCustomer]);

  async function openPortal() {
    setMessage("");
    if (!customerId) {
      setMessage("Enter a Stripe customer ID (cus_...) to open the billing portal.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });
      const data = await res.json();
      if (data?.url) {
        // Remember for next time while you don't have sign‑in wired
        window.localStorage.setItem("stripe_customer_id", customerId);
        window.location.href = data.url;
      } else if (data?.error) {
        setMessage(data.error);
      } else {
        setMessage("Could not open billing portal. Try again or contact us.");
      }
    } catch (err: any) {
      setMessage("Something went wrong. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Your Account</h1>
      <p className="mt-2 text-neutral-600">Manage your membership, billing details, and receipts.</p>

      {/* Temporary no-auth experience */}
      <section className="mt-8 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-medium text-neutral-900">Manage Billing</h2>
        <p className="mt-1 text-sm text-neutral-600">
          While sign‑in is under construction, paste your Stripe customer ID (<code>cus_...</code>) to open the secure Billing Portal.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="cus_123456789..."
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <Button onClick={openPortal} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800 text-white">
            {loading ? "Opening..." : "Open Billing Portal"}
          </Button>
        </div>
        {message && <p className="mt-3 text-sm text-amber-700">{message}</p>}

        <div className="mt-4 text-xs text-neutral-500">
          Tip: add <code>?customer=cus_...</code> to the URL or we’ll remember your ID locally for next time.
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-medium text-neutral-900">Next Up</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>We’ll wire sign‑in so your account auto‑loads without the customer ID field.</li>
          <li>Webhook will flip your membership status right after checkout.</li>
          <li>From here, you’ll access booking history, member perks, and receipts.</li>
        </ul>
      </section>
    </main>
  );
}