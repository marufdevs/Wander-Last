import type { Metadata } from "next";
import { Suspense } from "react";

import { DestinationsSection } from "@/components/destinations-section";
import { DestinationsSkeleton } from "@/components/destinations-skeleton";

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlast",
  description:
    "Find your perfect travel experience from our curated collection of destinations.",
};

export default function DestinationsPage() {
  return (
    <main className="min-h-[calc(100svh-72px)] bg-white px-5 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-[900px]">
        <header>
          <h1 className="text-[34px] font-normal leading-tight tracking-tight text-zinc-900 sm:text-[40px]">
            Explore All Destinations
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        <Suspense fallback={<DestinationsSkeleton />}>
          <DestinationsSection />
        </Suspense>
      </div>
    </main>
  );
}
