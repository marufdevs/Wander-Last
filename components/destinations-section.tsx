import Link from "next/link";
import { connection } from "next/server";
import { Compass, MapPinned } from "lucide-react";

import { DestinationsGrid } from "@/components/destinations-grid";
import type { Destination } from "@/Types/destination";

const apiBaseUrl =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

async function getDestinations(): Promise<Destination[]> {
  const response = await fetch(`${apiBaseUrl}/destinations`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  const destinations = Array.isArray(data) ? data : data?.destinations;

  return Array.isArray(destinations) ? destinations : [];
}

export async function DestinationsSection() {
  await connection();

  let destinations: Destination[] = [];
  let failed = false;

  try {
    destinations = await getDestinations();
  } catch (error) {
    console.error(error);
    failed = true;
  }

  if (failed) {
    return (
      <div className="mt-8 border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
        <Compass
          className="mx-auto size-8 text-zinc-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-medium text-zinc-900">
          Could not load destinations
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          The travel API is not responding right now. Make sure it is running and
          refresh the page.
        </p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="mt-8 border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
        <MapPinned
          className="mx-auto size-8 text-zinc-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-medium text-zinc-900">
          No destinations yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Travel packages you add will show up here for your customers to
          explore.
        </p>
        <Link
          href="/add-new-destination"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-none bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Add New Destination
        </Link>
      </div>
    );
  }

  return <DestinationsGrid destinations={destinations} />;
}
