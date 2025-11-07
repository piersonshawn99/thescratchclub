// app/thanks/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThanksPage() {
  return (
    <main className="mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-semibold text-emerald-700">
        Welcome to The Scratch Club!
      </h1>

      <p className="mt-4 text-neutral-700">
        Your membership checkout was successful — you’ll receive a confirmation email shortly.
      </p>
      <p className="mt-2 text-neutral-500">
        You can manage your billing or book your first session anytime.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link href="/" passHref>
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
            Return Home
          </Button>
        </Link>
        <Link href="/account" passHref>
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            Manage Billing
          </Button>
        </Link>
      </div>
    </main>
  );
}
