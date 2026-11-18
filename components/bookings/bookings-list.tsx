"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, MapPinned } from "lucide-react";

import { BookingCard } from "@/components/bookings/booking-card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { Booking } from "@/Types/booking";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function BookingsList() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  function handleRetry() {
    setIsLoading(true);
    setFailed(false);
    setReloadToken((token) => token + 1);
  }

  function handleDeleted(id: string) {
    setBookings((previous) =>
      previous.filter((booking) => booking._id !== id),
    );
  }

  useEffect(() => {
    if (!isPending && !email) {
      router.replace("/sign-in");
    }
  }, [isPending, email, router]);

  useEffect(() => {
    if (!email) {
      return;
    }

    let active = true;
    const userEmail = email;

    async function loadBookings() {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const response = await fetch(
          `${apiBaseUrl}/bookings/${encodeURIComponent(userEmail)}`,
          {
            cache: "no-store",
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: Booking[] = await response.json();

        if (!active) {
          return;
        }

        setBookings(Array.isArray(data) ? data : []);
        setFailed(false);
      } catch (error) {
        if (!active) {
          return;
        }

        console.error(error);
        setFailed(true);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadBookings();

    return () => {
      active = false;
    };
  }, [email, reloadToken]);

  if (isPending || !email || isLoading) {
    return <BookingsSkeleton />;
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
          Could not load your bookings
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          The travel API is not responding right now. Make sure it is running
          and try again.
        </p>
        <Button
          type="button"
          onClick={handleRetry}
          className="mt-6 h-11 rounded-none bg-brand px-6 text-sm font-semibold text-white hover:bg-brand/90"
        >
          Try again
        </Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mt-8 border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
        <MapPinned
          className="mx-auto size-8 text-zinc-400"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-medium text-zinc-900">
          No bookings yet
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Travel packages you book will show up here so you can review the
          details or cancel your trip.
        </p>
        <Link
          href="/destinations"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-none bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
        >
          Browse destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} onDeleted={handleDeleted} />
      ))}
    </div>
  );
}

function BookingsSkeleton() {
  return (
    <div className="mt-8 space-y-5" aria-busy="true" aria-label="Loading bookings">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse border border-zinc-200 bg-white p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="aspect-[2/1] w-full shrink-0 bg-zinc-100 sm:w-[240px]" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-24 bg-zinc-100" />
              <div className="h-6 w-2/3 bg-zinc-100" />
              <div className="h-3 w-40 bg-zinc-100" />
              <div className="h-3 w-32 bg-zinc-100" />
              <div className="h-7 w-20 bg-zinc-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
