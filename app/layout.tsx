// --- FILE: app/layout.tsx ---
import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scratchclubgolf.com";

export const metadata: Metadata = {
  title: "The Scratch Club",
  description: "Practice With Purpose. Play With Confidence.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased pt-[env(safe-area-inset-top)]">
        <Header />
        <main className="flex-1 pt-[110px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
