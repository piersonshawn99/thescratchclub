import Image from "next/image";
import data from "@/data/courses.json";
export default function CoursesPage(){
  const courses = (data as any).courses as Array<{name:string;city:string;distance_miles:number;url:string;image:string}>;
  return (<main className="mx-auto max-w-7xl px-6 py-16">
    <h1 className="text-3xl font-semibold tracking-tight">Michigan Courses</h1>
    <p className="mt-4 text-neutral-600">Explore nearby favorites, see distance from the club, and jump to tee times.</p>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{courses.map((c)=>(
      <a key={c.name} href={c.url} target="_blank" rel="noreferrer" className="group rounded-3xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
        <div className="aspect-[4/3] w-full relative bg-neutral-100"><Image src={c.image} alt={c.name} fill className="object-cover"/></div>
        <div className="p-4"><h2 className="text-base font-semibold">{c.name}</h2><p className="mt-1 text-sm text-neutral-600">{c.city} · {c.distance_miles.toFixed(1)} mi</p><p className="mt-2 text-sm text-emerald-700 group-hover:underline">View course →</p></div>
      </a>
    ))}</div>
  </main>);
}