import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gift Cards & Golf Experiences | The Scratch Club",
  description: "Give the gift of better golf with The Scratch Club. Ask about gift cards and golf experiences.",
};
export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EC] text-[#143029]">
      <section className="bg-[#143029] px-5 py-16 text-center text-[#F8F5EC]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DBB158]">The Scratch Club</p>
        <h1 className="mt-5 font-serif text-4xl sm:text-6xl">Give the Gift of Better Golf.</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-7">For golfers who love the game, give an opportunity to practice, play, and improve.</p>
      </section>
      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-14 md:grid-cols-2" aria-label="Gift options">
        <article className="border border-[#143029]/20 bg-white p-8">
          <h2 className="font-serif text-3xl">Gift Cards</h2>
          <p className="mt-4 leading-7 text-[#143029]/80">Interested in giving a dollar-value gift? Contact our team for current availability and purchasing details.</p>
          <Link href="/contact?interest=gift-card" className="mt-8 inline-block bg-[#143029] px-6 py-3 font-semibold text-white hover:bg-[#285247]">Ask About Gift Cards</Link>
        </article>
        <article className="border border-[#143029]/20 bg-white p-8">
          <h2 className="font-serif text-3xl">Golf Experiences</h2>
          <p className="mt-4 leading-7 text-[#143029]/80">Want to give a specific golf experience? Ask us about voucher options as we prepare for opening.</p>
          <Link href="/contact?interest=golf-voucher" className="mt-8 inline-block bg-[#143029] px-6 py-3 font-semibold text-white hover:bg-[#285247]">Ask About Experiences</Link>
        </article>
      </section>
      <p className="mx-auto max-w-3xl px-5 pb-16 text-center text-sm text-[#143029]/75">Online gift purchasing and redemption options will be published once confirmed with our booking provider.</p>
    </div>
  );
}
