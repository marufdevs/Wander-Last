"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Pencil, Save, Trash2 } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import type { Destination } from "@/Types/destination";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const inputClassName =
  "h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40";

const labelClassName = "mb-1.5 block text-sm font-medium text-zinc-900";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
] as const;

type FormState = {
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

function toFormState(destination: Destination): FormState {
  return {
    destinationName: destination.destinationName ?? "",
    country: destination.country ?? "",
    category: destination.category ?? "",
    price: destination.price != null ? String(destination.price) : "",
    duration: destination.duration ?? "",
    departureDate: destination.departureDate?.slice(0, 10) ?? "",
    imageUrl: destination.imageUrl ?? "",
    description: destination.description ?? "",
  };
}

export function EditDestinationDialog({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(destination));

  const categoryOptions = Array.from(
    new Set([destination.category, ...categories].filter(Boolean)),
  );

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setForm(toFormState(destination));
    }

    setOpen(nextOpen);
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const destinationName = form.destinationName.trim();
    const country = form.country.trim();
    const category = form.category.trim();
    const price = form.price.trim();
    const duration = form.duration.trim();
    const departureDate = form.departureDate.trim();
    const imageUrl = form.imageUrl.trim();
    const description = form.description.trim();

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
      const response = await fetch(
        `${apiBaseUrl}/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        toast.add({
          type: "error",
          description:
            result?.message ?? "Could not update the travel package.",
        });
        return;
      }

      setOpen(false);
      toast.add({
        type: "success",
        description: "Travel package updated successfully.",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Unable to reach the server." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        onClick={() => handleOpenChange(true)}
        className="h-9 gap-2 rounded-none border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
      >
        <Pencil className="size-3.5" aria-hidden="true" />
        Edit
      </Button>

      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-none border border-zinc-200 bg-white p-6 ring-0 sm:max-w-[600px]">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-lg font-medium text-zinc-900">
            Update Travel Package
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-zinc-500">
            Make changes to the travel package details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <input
                id="edit-destination-name"
                name="destinationName"
                type="text"
                aria-label="Destination name"
                placeholder="Destination name"
                value={form.destinationName}
                onChange={(event) =>
                  updateField("destinationName", event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="edit-country" className={labelClassName}>
                Country
              </label>
              <input
                id="edit-country"
                name="country"
                type="text"
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="edit-category" className={labelClassName}>
                Category
              </label>
              <div className="relative">
                <select
                  id="edit-category"
                  name="category"
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={cn(inputClassName, "appearance-none pr-9")}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categoryOptions.map((category) => (
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
              <label htmlFor="edit-price" className={labelClassName}>
                Price (USD)
              </label>
              <input
                id="edit-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="edit-duration" className={labelClassName}>
                Duration
              </label>
              <input
                id="edit-duration"
                name="duration"
                type="text"
                placeholder="e.g., 7 Days / 6 Nights"
                value={form.duration}
                onChange={(event) =>
                  updateField("duration", event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="edit-departure-date" className={labelClassName}>
                Departure Date
              </label>
              <input
                id="edit-departure-date"
                name="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  updateField("departureDate", event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="edit-image-url" className={labelClassName}>
                Image URL
              </label>
              <input
                id="edit-image-url"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) =>
                  updateField("imageUrl", event.target.value)
                }
                className={inputClassName}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="edit-description" className={labelClassName}>
                Description
              </label>
              <textarea
                id="edit-description"
                name="description"
                rows={5}
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                className={cn(inputClassName, "h-auto resize-y py-3")}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="h-10 gap-2 rounded-none border-red-200 bg-white px-4 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 gap-2 rounded-none bg-brand px-4 text-sm font-semibold text-white hover:bg-brand/90"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="size-4" aria-hidden="true" />
              )}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
