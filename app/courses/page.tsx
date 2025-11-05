import Image from "next/image";
import coursesData from "@/data/courses.json";

export default function CoursesPage() {
  const { courses } = coursesData as {
    courses: {
      name: string;
      city: string;
      distance_miles: number;
      url: string;
      image: string;
    }[];
  };

  // Optional: sort by distance, closest first
  const sorted = [...courses].sort((a, b) => (a.distance_miles ?? 0) - (b.distance_miles ?? 0));

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Partner Golf Courses</h1>
        <p className="mt-4 text-lg text-neutral-600">
          Train in our Trackman bays, then take your confidence outside. These are our nearby picks.
        </p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((c) => (
          <li
            key={c.name}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                priority={false}
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold tracking-tight">{c.name}</h2>
              <p className="mt-1 text-sm text-neutral-600">
                {c.city} · {Number(c.distance_miles).toFixed(1)} mi
              </p>

              <div className="mt-4">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:border-emerald-500 hover:text-emerald-700"
                >
                  Visit Course Website →
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
