import type { Metadata } from "next";

import { BookingsList } from "@/components/bookings/bookings-list";

export const metadata: Metadata = {
  title: "My Bookings | Wanderlast",
  description: "Manage and view your upcoming travel plans.",
};

export default function BookingsPage() {
  return (
    <main className="min-h-[calc(100svh-72px)] bg-white px-5 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-[900px]">
        <header>
          <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Manage and view your upcoming travel plans
          </p>
        </header>

        <BookingsList />
      </div>
    </main>
  );
}
