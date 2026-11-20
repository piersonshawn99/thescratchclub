// --- FILE: app/memberships/page.tsx ---
import MembershipsClient from "@/components/memberships/MembershipsClient";

export const metadata = {
  title: "Memberships | The Scratch Club",
  description:
    "Discover Player, Performance, and Pursuit memberships at The Scratch Club. Practice With Purpose. Play With Confidence.",
};

export default function Page() {
  return <MembershipsClient />;
}
