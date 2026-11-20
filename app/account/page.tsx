import type { Metadata } from "next";
import AccountClient from "@/components/account/AccountClient";
export const metadata: Metadata = { title: "Membership Account | The Scratch Club", description: "Get help with your Scratch Club membership and account." };
export default function AccountPage() {
  return <main className="mx-auto max-w-3xl px-4 py-16"><h1 className="font-serif text-4xl text-[#143029]">Membership Account</h1><AccountClient /></main>;
}
