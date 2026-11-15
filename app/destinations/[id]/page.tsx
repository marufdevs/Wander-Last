import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Compass } from "lucide-react";

import { DestinationDetail } from "@/components/destination-detail";
import type { Destination } from "@/Types/destination";

const apiBaseUrl =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

export const metadata: Metadata = {
  title: "Destination Details | Wanderlast",
  description: "View the details of this Wanderlast travel package.",
};

// The shared navbar reads usePathname(), which can't be resolved for an
// unknown dynamic id at build time. Allow this route to block instead.
export const instant = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getDestination(id: string): Promise<Destination | null> {
  const response = await fetch(`${apiBaseUrl}/destinations/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const destination = (await response.json()) as Destination;

  return destination?._id ? destination : null;
}

async function DestinationDetailLoader({ params }: PageProps) {
  const { id } = await params;

  let destination: Destination | null = null;
  let failed = false;

  try {
    destination = await getDestination(id);
  } catch (error) {
    console.error(error);
    failed = true;
  }

  if (failed) {
    return (
      <DetailMessage
        title="Could not load this destination"
        body="The travel API is not responding right now. Make sure it is running and refresh the page."
      />
    );
  }

  if (!destination) {
    return (
      <DetailMessage
        title="Destination not found"
        body="We could not find a travel package with that id."
      />
    );
  }

  return <DestinationDetail destination={destination} />;
}

export default function DestinationPage({ params }: PageProps) {
  return (
    <main className="min-h-[calc(100svh-72px)] bg-white px-5 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto w-full max-w-[1000px]">
        <Suspense fallback={<DestinationDetailSkeleton />}>
          <DestinationDetailLoader params={params} />
        </Suspense>
      </div>
    </main>
  );
}

function DetailMessage({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
      <Compass
        className="mx-auto size-8 text-zinc-400"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h1 className="mt-4 text-lg font-medium text-zinc-900">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        {body}
      </p>
      <Link
        href="/destinations"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-none bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Back to Destinations
      </Link>
    </div>
  );
}

function DestinationDetailSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading destination">
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 bg-zinc-100" />
        <div className="h-9 w-40 bg-zinc-100" />
      </div>

      <div className="mt-5 aspect-[3/1] w-full bg-zinc-100" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-zinc-100" />
          <div className="h-11 w-2/3 bg-zinc-100" />
          <div className="h-4 w-56 bg-zinc-100" />
          <div className="h-28 w-full bg-zinc-100" />
          <div className="h-24 w-full bg-zinc-100" />
        </div>
        <div className="h-72 bg-zinc-100" />
      </div>
    </div>
  );
}
