"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Loader2, Plus, Trash2 } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

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

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function AddNewDestination() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const destinationName = String(data.destinationName ?? "").trim();
    const country = String(data.country ?? "").trim();
    const category = String(data.category ?? "").trim();
    const price = String(data.price ?? "").trim();
    const duration = String(data.duration ?? "").trim();
    const departureDate = String(data.departureDate ?? "").trim();
    const imageUrl = String(data.imageUrl ?? "").trim();
    const description = String(data.description ?? "").trim();

    if (
      !destinationName ||
      !country ||
      !category ||
      !price ||
      !duration ||
      !departureDate ||
      !description
    ) {
      toast.add({
        type: "warning",
        description: "Please fill up all the required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const response = await fetch(`${apiBaseUrl}/add-new-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destinationName,
          country,
          category,
          price: Number(price),
          duration,
          departureDate,
          imageUrl,
          description,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        toast.add({
          type: "error",
          description: result?.message ?? "Could not create the travel package.",
        });
        return;
      }

      form.reset();
      toast.add({
        type: "success",
        description: result?.message ?? "Travel package added successfully.",
      });
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Unable to reach the server." });
    } finally {
      setIsSubmitting(false);
    }
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
            type="reset"
            variant="outline"
            className="h-11 w-full gap-2 rounded-none border-zinc-200 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50 sm:w-auto sm:px-6"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full gap-2 rounded-none bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="size-4" aria-hidden="true" />
            )}
            {isSubmitting ? "Saving..." : "Add Travel Package"}
          </Button>
        </div>
      </form>
    </div>
  );
}
