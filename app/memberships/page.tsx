// --- FILE: app/memberships/page.tsx ---
import MembershipsClient from "@/components/memberships/MembershipsClient";

export const metadata = {
  title: "Memberships | The Scratch Club",
  description:
    "Train Smarter. Play Better. Choose an indoor golf membership tier that fits your game.",
};

export default function Page() {
  return <MembershipsClient />;
}
