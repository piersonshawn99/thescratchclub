import Link from "next/link";
export default function AccountClient() {
  return (
    <section className="mt-8 border border-[#143029]/20 bg-[#F8F5EC] p-7 text-[#143029]">
      <h2 className="font-serif text-2xl">Membership Account</h2>
      <p className="mt-3 leading-7">Membership purchases and account management will be handled through our Trackman booking platform. For help with an existing membership, contact The Scratch Club.</p>
      <Link href="/contact?interest=account-support" className="mt-6 inline-block bg-[#143029] px-5 py-3 text-sm font-semibold text-white hover:bg-[#285247]">Contact the Club</Link>
    </section>
  );
}
