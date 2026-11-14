"use client";

import type { FormEvent } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

const inputClassName =
  "h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40";

const labelClassName = "mb-1.5 block text-sm font-semibold text-zinc-900";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
] as const;

export function AddNewDestination() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Wire the create-package API here when the backend flow is ready.
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          Travel Packages
        </p>
        <h1 className="mt-3 font-serif text-4xl font-normal leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          Add New Travel Package
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-500">
          Fill in the details below to create a new travel package for your
          customers.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="border border-zinc-200 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="destination-name" className={labelClassName}>
              Destination Name
            </label>
            <input
              id="destination-name"
              name="destinationName"
              type="text"
              placeholder="e.g. Santorini, Greece"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="country" className={labelClassName}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="e.g. Greece"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClassName}>
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                defaultValue=""
                className={cn(inputClassName, "appearance-none pr-9")}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className={labelClassName}>
              Price (USD)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="duration" className={labelClassName}>
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              placeholder="e.g. 7 Days / 6 Nights"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="departure-date" className={labelClassName}>
              Departure Date
            </label>
            <input
              id="departure-date"
              name="departureDate"
              type="date"
              placeholder="mm/dd/yyyy"
              className={inputClassName}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="image-url" className={labelClassName}>
              Image URL
            </label>
            <input
              id="image-url"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={inputClassName}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClassName}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe the package, itinerary highlights, and what's included."
              className={cn(inputClassName, "h-auto resize-y py-3")}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-none border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50 sm:w-auto sm:px-6"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 w-full gap-2 rounded-none bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90 sm:w-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add Travel Package
          </Button>
        </div>
      </form>
    </div>
  );
}
