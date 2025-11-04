export default function FAQPage() {
  const faqs = [
    { q: "Do I need a membership to book a simulator bay?", a: "No. Anyone can book. Members get priority booking windows and discounted rates." },
    { q: "Can I bring friends or family to my session?", a: "Yes—our bays are designed for up to 4 players. Please be respectful of time and pace." },
    { q: "Do you offer coaching?", a: "Yes. We offer 1-on-1 lessons, multi-pack options, and league-style coaching. Book via the Coaching page." },
    { q: "What is your cancellation policy?", a: "Cancel or reschedule up to 12 hours in advance without penalty. Late cancellations may incur a fee." },
    { q: "Is Trackman included?", a: "Yes. All bays are Trackman-powered with full data and virtual courses." }
  ];
  return (<main className="mx-auto max-w-5xl px-6 py-16">
    <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
    <p className="mt-4 text-neutral-600">Answers to common questions about memberships, coaching, and booking.</p>
    <dl className="mt-10 space-y-6">{faqs.map((f,i)=>(
      <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <dt className="text-base font-semibold">{f.q}</dt>
        <dd className="mt-2 text-neutral-700">{f.a}</dd>
      </div>
    ))}</dl>
  </main>);
}