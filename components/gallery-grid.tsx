"use client";

import { useState } from "react";
import { Photo } from "@/components/photo";

type GalleryPhoto = {
  src: string;
  alt: string;
  category?: "classrooms" | "campus" | "outings" | "assemblies";
};

const categorizedPhotos: GalleryPhoto[] = [
  { src: "/images/life/garden.jpg", alt: "Students and teachers outdoors, with mountains behind them", category: "outings" },
  { src: "/images/life/pond.jpg", alt: "Three students beside a garden pond", category: "outings" },
  { src: "/images/life/boys-garden.jpg", alt: "Boys in blue uniform in a garden", category: "outings" },
  { src: "/images/life/blue-building.jpg", alt: "A class in blue and white outside the school building", category: "campus" },
  { src: "/images/life/young-blue.jpg", alt: "Younger students in blue uniform outside the school", category: "campus" },
  { src: "/images/life/blue-line.jpg", alt: "Students and teachers lined up in the school yard", category: "assemblies" },
  { src: "/images/life/girls-hills.jpg", alt: "Girls in maroon uniform with the hills behind them", category: "outings" },
  { src: "/images/life/maroon-yard.jpg", alt: "A class of girls in maroon uniform in the yard", category: "campus" },
  { src: "/images/life/maroon-group.jpg", alt: "Girls and teachers gathered in the yard", category: "assemblies" },
  { src: "/images/life/maroon-group-2.jpg", alt: "Another class of girls with their teachers", category: "assemblies" },
  { src: "/images/life/khaki-class.jpg", alt: "Boys in khaki uniform with their teacher", category: "classrooms" },
  { src: "/images/life/class-extra.jpg", alt: "A boys' class standing together outdoors", category: "campus" },
  { src: "/images/life/young-blue-2.jpg", alt: "Younger boys in uniform lined up in the yard", category: "assemblies" },
  { src: "/images/gathering.jpg", alt: "An earlier gathering of students and teachers", category: "assemblies" },
  { src: "/images/class-one.jpg", alt: "Students standing in a classroom", category: "classrooms" },
  { src: "/images/class-two.jpg", alt: "Girls and boys seated in class", category: "classrooms" },
  { src: "/images/class-three.jpg", alt: "A larger class in uniform", category: "classrooms" },
  { src: "/images/assembly.jpg", alt: "Students at an outdoor gathering", category: "assemblies" },
  { src: "/images/boys-outing.jpg", alt: "Boys in uniform on an outing", category: "outings" },
  { src: "/images/girls-yard.jpg", alt: "Girls lined up in the school yard", category: "campus" },
  { src: "/images/campus-group.jpg", alt: "Younger students outside the school building", category: "campus" },
  { src: "/images/chairman.jpg", alt: "Iftekhar Ul Akbar, Chairman", category: "assemblies" },
];

const categories = [
  { id: "all", label: "All Photos" },
  { id: "classrooms", label: "Classrooms & Learning" },
  { id: "campus", label: "Campus & Yard" },
  { id: "assemblies", label: "Assemblies & Events" },
  { id: "outings", label: "Outings & Nature" },
] as const;

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? categorizedPhotos
    : categorizedPhotos.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              activeCategory === cat.id
                ? "bg-accent text-white shadow-sm"
                : "border border-line bg-white text-ink hover:border-accent hover:text-accent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((photo, index) => (
          <div
            key={`${photo.src}-${index}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
              <Photo
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4 md:p-5">
              <p className="font-serif text-lg leading-snug text-ink">{photo.alt}</p>
              <span className="mt-2 inline-block rounded bg-[#f6ebe4] px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                {photo.category ?? "campus"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
