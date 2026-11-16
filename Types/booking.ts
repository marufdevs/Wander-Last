import type { Destination } from "./destination";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Booking {
  _id: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
  };
  destination?: Destination;
  departureDate?: string;
  bookingDate?: string;
  status?: BookingStatus;
}
