"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  Loader2,
  Ticket,
  Trash2,
  TriangleAlert,
  XCircle,
} from "lucide-react";
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
import type { Booking } from "@/Types/booking";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const fallbackImage = "/Images/Banner.png";

const statusStyles = {
  confirmed: {
    label: "Confirmed",
    icon: CircleCheck,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "border-red-200 bg-red-50 text-red-600",
  },
} as const;

function getImageSrc(imageUrl?: string) {
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

function formatPrice(price?: number) {
  if (typeof price !== "number" || Number.isNaN(price)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function BookingCard({
  booking,
  onDeleted,
}: {
  booking: Booking;
  onDeleted?: (id: string) => void;
}) {
  const destination = booking.destination;
  const status = statusStyles[booking.status ?? "confirmed"] ?? statusStyles.confirmed;
  const StatusIcon = status.icon;
  const bookingId = booking._id ? booking._id.slice(-6) : "—";
  const destinationName = destination?.destinationName ?? "this travel package";

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (isDeleting) {
      return;
    }

    setOpen(nextOpen);
  }

  async function handleDelete() {
    if (!booking._id) {
      return;
    }

    setIsDeleting(true);

    try {
      const ownerEmail = booking.user?.email;
      const query = ownerEmail
        ? `?email=${encodeURIComponent(ownerEmail)}`
        : "";

      const response = await fetch(
        `${apiBaseUrl}/bookings/${booking._id}${query}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        toast.add({
          type: "error",
          description: result?.message ?? "Could not cancel this booking.",
        });
        return;
      }

      setOpen(false);
      toast.add({
        type: "success",
        description: "Booking cancelled successfully.",
      });
      onDeleted?.(booking._id);
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Unable to reach the server." });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <article className="border border-zinc-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-zinc-100 sm:w-[240px]">
          <Image
            src={getImageSrc(destination?.imageUrl)}
            alt={destination?.destinationName ?? "Travel package"}
            fill
            sizes="(min-width: 640px) 240px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium",
              status.className,
            )}
          >
            <StatusIcon className="size-3.5" aria-hidden="true" />
            {status.label}
          </span>

          <h2 className="mt-2 font-serif text-2xl leading-tight text-zinc-900">
            {destination?.destinationName ?? "Travel package"}
          </h2>

          <div className="mt-2.5 space-y-1.5 text-xs text-zinc-500">
            <p className="flex items-center gap-1.5">
              <CalendarDays
                className="size-3.5 shrink-0 text-zinc-400"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Departure: {formatDate(booking.departureDate)}
            </p>
            <p className="flex items-center gap-1.5">
              <Ticket
                className="size-3.5 shrink-0 text-zinc-400"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span title={booking._id}>
                Booking ID: {bookingId}
              </span>
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:mt-auto sm:flex-row sm:items-end sm:justify-between sm:pt-4">
            <p className="text-2xl font-semibold leading-none text-brand">
              {formatPrice(destination?.price)}
            </p>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Dialog open={open} onOpenChange={handleOpenChange}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(true)}
                  disabled={!booking._id}
                  className="h-9 gap-2 rounded-none border-red-200 bg-white px-4 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Cancel
                </Button>

                <DialogContent
                  showCloseButton={!isDeleting}
                  className="rounded-none border border-zinc-200 bg-white p-6 ring-0 sm:max-w-[440px]"
                >
                  <DialogHeader>
                    <div className="flex size-10 items-center justify-center border border-red-200 bg-red-50">
                      <TriangleAlert
                        className="size-5 text-red-600"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>
                    <DialogTitle className="text-lg font-medium text-zinc-900">
                      Cancel this booking?
                    </DialogTitle>
                    <DialogDescription className="text-sm leading-6 text-zinc-500">
                      This permanently removes your booking for{" "}
                      <strong className="font-semibold text-zinc-900">
                        {destinationName}
                      </strong>{" "}
                      ({bookingId}). This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                      disabled={isDeleting}
                      className="h-10 rounded-none border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                    >
                      Keep booking
                    </Button>
                    <Button
                      type="button"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="h-10 gap-2 rounded-none bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      {isDeleting ? (
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <Trash2 className="size-4" aria-hidden="true" />
                      )}
                      {isDeleting ? "Cancelling..." : "Cancel booking"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {destination?._id ? (
                <Link
                  href={`/destinations/${destination._id}`}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-none bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
                >
                  <Eye className="size-3.5" aria-hidden="true" />
                  View
                </Link>
              ) : (
                <Button
                  type="button"
                  disabled
                  className="h-9 gap-2 rounded-none bg-brand px-4 text-sm font-semibold text-white"
                >
                  <Eye className="size-3.5" aria-hidden="true" />
                  View
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
