import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import { DeleteDestinationButton } from "@/components/delete-destination-button";
import { EditDestinationDialog } from "@/components/edit-destination-dialog";
import { Button } from "@/components/ui/button";
import type { Destination } from "@/Types/destination";

const fallbackImage = "/Images/Banner.png";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

// TODO: Remove these defaults once the API returns highlights for every package.
const defaultHighlights = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];

function getImageSrc(imageUrl: string) {
  if (!imageUrl) {
    return fallbackImage;
  }

  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return fallbackImage;
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDuration(duration: string) {
  const trimmed = duration?.trim();

  if (!trimmed) {
    return "—";
  }

  if (/^\d+$/.test(trimmed)) {
    return `${trimmed} Days`;
  }

  return trimmed;
}

export function DestinationDetail({
  destination,
}: {
  destination: Destination;
}) {
  const highlights = destination.highlights?.length
    ? destination.highlights
    : defaultHighlights;

  // TODO: Replace these fallbacks once the API returns rating and review counts.
  const rating = destination.rating ?? 4.9;
  const reviews = destination.reviews ?? 234;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden="true" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <EditDestinationDialog destination={destination} />
          <DeleteDestinationButton
            destinationId={destination._id}
            destinationName={destination.destinationName}
          />
        </div>
      </div>

      <div className="relative mt-5 aspect-[3/1] w-full overflow-hidden bg-zinc-100">
        <Image
          src={getImageSrc(destination.imageUrl)}
          alt={destination.destinationName}
          fill
          priority
          sizes="(min-width: 1024px) 1000px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin
              className="size-4 shrink-0"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            {destination.country}
          </p>

          <h1 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            {destination.destinationName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <Star
                className="size-4 fill-zinc-900 text-zinc-900"
                aria-hidden="true"
              />
              <span className="font-semibold text-zinc-900">{rating}</span>
              <span className="text-zinc-500">({reviews} reviews)</span>
            </span>

            <span
              className="hidden h-4 w-px bg-zinc-200 sm:block"
              aria-hidden="true"
            />

            <span className="flex items-center gap-1.5 text-zinc-600">
              <CalendarDays
                className="size-4 shrink-0 text-zinc-400"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              {formatDuration(destination.duration)}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-normal text-zinc-900">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {destination.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-2xl font-normal text-zinc-900">
              Highlights
            </h2>
            <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-zinc-600"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-emerald-600"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="border border-zinc-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] lg:sticky lg:top-24">
          <p className="text-xs text-zinc-500">Starting from</p>
          <p className="mt-1 text-3xl font-semibold leading-none text-zinc-900">
            {formatPrice(destination.price)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">per person</p>

          <div className="mt-5">
            <label htmlFor="departure-date" className="sr-only">
              Departure date
            </label>
            <input
              id="departure-date"
              name="departureDate"
              type="date"
              defaultValue={destination.departureDate?.slice(0, 10)}
              className="h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40"
            />
            <Button
              type="button"
              className="mt-3 h-11 w-full gap-2 rounded-none bg-brand text-sm font-semibold text-white hover:bg-brand/90"
            >
              Book Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-xs leading-5 text-zinc-600"
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {perk}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
