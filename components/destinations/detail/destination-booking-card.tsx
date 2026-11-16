"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import type { Destination } from "@/Types/destination";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function DestinationBookingCard({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [departureDate, setDepartureDate] = useState(
    destination.departureDate?.slice(0, 10) ?? "",
  );
  const [isBooking, setIsBooking] = useState(false);

  async function handleBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = session?.user;

    if (!user) {
      toast.add({
        type: "warning",
        description: "Please sign in to book this package.",
      });
      router.push("/sign-in");
      return;
    }

    if (!departureDate) {
      toast.add({
        type: "warning",
        description: "Please select a departure date.",
      });
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch(`${apiBaseUrl}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image ?? null,
          },
          destination,
          departureDate,
          bookingDate: new Date().toISOString(),
          status: "pending",
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        toast.add({
          type: "error",
          description: result?.message ?? "Could not complete the booking.",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Booking confirmed. We'll be in touch with the details.",
      });

      router.push("/bookings");
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Unable to reach the server." });
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <aside className="border border-zinc-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] lg:sticky lg:top-24">
      <p className="text-xs text-zinc-500">Starting from</p>
      <p className="mt-1 text-3xl font-semibold leading-none text-zinc-900">
        {formatPrice(destination.price)}
      </p>
      <p className="mt-1 text-xs text-zinc-500">per person</p>

      <form onSubmit={handleBook} className="mt-5">
        <label htmlFor="departure-date" className="sr-only">
          Departure date
        </label>
        <input
          id="departure-date"
          name="departureDate"
          type="date"
          value={departureDate}
          onChange={(event) => setDepartureDate(event.target.value)}
          className="h-10 w-full rounded-none border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none transition-colors focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand/40"
        />
        <Button
          type="submit"
          disabled={isBooking || isPending}
          className="mt-3 h-11 w-full gap-2 rounded-none bg-brand text-sm font-semibold text-white hover:bg-brand/90"
        >
          {isBooking ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
          {isBooking ? "Booking..." : "Book Now"}
        </Button>
      </form>

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
  );
}
