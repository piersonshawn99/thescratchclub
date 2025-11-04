import type { Metadata } from "next";
// import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "The Scratch Club",
  description: "Train Smarter. Play Better.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">{children}</body>
    </html>
  );
}
