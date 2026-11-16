import type { Metadata } from "next";

import { AddNewDestination } from "@/components/add-new-destination/add-new-destination";

export const metadata: Metadata = {
  title: "Add New Travel Package | Wanderlast",
  description: "Create a new travel package for your customers.",
};

export default function AddNewDestinationPage() {
  return (
    <main className="min-h-[calc(100svh-72px)] bg-slate-50 px-5 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-[900px]">
        <AddNewDestination />
      </div>
    </main>
  );
}
