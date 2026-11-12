import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";

const searchFields = [
  {
    id: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
    defaultValue: "",
  },
  {
    id: "date-duration",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
    defaultValue: "Anytime/3 Days",
  },
  {
    id: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    defaultValue: "$0-$3000",
  },
  {
    id: "people",
    label: "People",
    placeholder: "5-10",
    defaultValue: "5-10",
  },
];

export function HeroBanner() {
  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Images/Banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-72px)] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-16 pb-24 text-center text-white sm:pt-20 sm:pb-28">
          <h1 className="w-full max-w-4xl text-[clamp(2.75rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em]">
            <span className="block">Discover Your</span>
            <span className="block">Next Adventure</span>
          </h1>

          <p className="mt-6 w-full max-w-[640px] text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#destinations"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-none bg-brand px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-brand/90"
              )}
            >
              Explore Now
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>

            <Link
              href="#destinations"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "h-12 rounded-none border-0 bg-white/35 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm hover:bg-white/45"
              )}
            >
              View Destination
            </Link>
          </div>
        </div>

        <div
          role="search"
          aria-label="Search destinations"
          className="grid grid-cols-2 gap-px border-t border-white/15 bg-white/15 backdrop-blur-md md:grid-cols-4 lg:grid-cols-[1.25fr_1.1fr_1fr_1fr_auto]"
        >
          {searchFields.map((field) => (
            <label
              key={field.id}
              htmlFor={field.id}
              className="flex min-h-[80px] flex-col justify-center gap-1 bg-black/35 px-5 py-4"
            >
              <span className="text-xs font-medium text-white/70">
                {field.label}
              </span>
              <input
                id={field.id}
                name={field.id}
                type="text"
                defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/80"
              />
            </label>
          ))}

          <Button
            type="button"
            className="col-span-2 h-full min-h-[64px] w-full rounded-none bg-brand px-10 text-sm font-semibold text-white hover:bg-brand/90 md:col-span-4 lg:col-span-1"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
