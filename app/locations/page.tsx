import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations | The Scratch Club",
  description: "Find The Scratch Club location and get directions.",
};

export default function LocationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Locations
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Visit The Scratch Club in the Lakeland area. Use the address below for
          directions.
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900">
          The Scratch Club — Lakeland Location
        </h2>

        <div className="mt-4 space-y-2 text-neutral-700">
          <p>9588 Chilson Commons Circle</p>
          <p>Hamburg Twp., MI 48169</p>
          <p>(Serving the Lakeland / Pinckney area)</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=9588+Chilson+Commons+Circle+Hamburg+Twp+MI+48169"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            Open in Google Maps
          </a>

          <a
            href="/contact"
            className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}