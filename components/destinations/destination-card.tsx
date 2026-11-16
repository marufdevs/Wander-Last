import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import type { Destination } from "@/Types/destination";

const fallbackImage = "/Images/Banner.png";

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
  return `$${price.toLocaleString("en-US")}`;
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination._id}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[2.2/1] w-full overflow-hidden bg-zinc-100">
        <Image
          src={getImageSrc(destination.imageUrl)}
          alt={destination.destinationName}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 flex items-center gap-1 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-900 shadow-sm">
          {destination.rating ?? 4.5}
          <Star className="size-2.5 fill-zinc-900 text-zinc-900" aria-hidden="true" />
        </span>
      </div>

      <div className="pt-3">
        <p className="flex items-center gap-1.5 text-xs text-zinc-500">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          {destination.country}
        </p>

        <div className="mt-1.5 flex items-end justify-between gap-3">
          <h3 className="text-[17px] font-medium leading-snug text-zinc-900">
            {destination.destinationName}
          </h3>
          <p className="shrink-0 text-sm font-semibold text-zinc-900">
            {formatPrice(destination.price)}
            <span className="text-xs font-normal text-zinc-500">/Person</span>
          </p>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <CalendarDays
            className="size-3.5 shrink-0"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          {destination.duration}
        </p>

        <span className="mt-2 inline-flex items-center gap-1 border-b border-brand/40 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand">
          Book Now
          <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
