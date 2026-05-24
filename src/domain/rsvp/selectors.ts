import type { AdminGuest, AdminRow } from "@/types/admin";
import type { GuestTransport } from "@/types/rsvp";

export type RsvpGuestLike = {
  id?: string;
  name?: string;
  attending?: boolean;
  dietary?: string;
  dietaryNote?: string;
  transport?: Partial<GuestTransport>;
};

export type RsvpRowLike = {
  guests?: RsvpGuestLike[];
  extraGuests?: RsvpGuestLike[];
  hasResponded?: boolean;
};

export type RsvpStatus = "confirmed" | "declined" | "pending";

const safeGuests = (guests?: RsvpGuestLike[]) => (Array.isArray(guests) ? guests : []);

export const getAllGuests = (row: RsvpRowLike): RsvpGuestLike[] => [
  ...safeGuests(row.guests),
  ...safeGuests(row.extraGuests),
];

export const isBusGuest = (guest: RsvpGuestLike) =>
  guest.attending === true && guest.transport?.type === "bus";

export const hasTransport = (guest: RsvpGuestLike) =>
  guest.attending === true && Boolean(guest.transport?.type) && guest.transport?.type !== "none";

export const getPickupLocation = (guest: RsvpGuestLike) =>
  guest.transport?.type === "bus" ? guest.transport.locationId : undefined;

export const getAttendingGuests = (row: RsvpRowLike) =>
  getAllGuests(row).filter((guest) => guest.attending === true);

export const getBusGuests = (row: RsvpRowLike) => getAllGuests(row).filter(isBusGuest);

export const getAttendingCount = (row: RsvpRowLike) => getAttendingGuests(row).length;

export const getTransportCount = (row: RsvpRowLike) => getBusGuests(row).length;

export const getStatus = (row: RsvpRowLike): RsvpStatus => {
  if (row.hasResponded === false) {
    return "pending";
  }

  const guests = safeGuests(row.guests);
  const coreAttending = guests.filter((guest) => guest.attending === true).length;

  if (coreAttending === 0) {
    return "declined";
  }

  return coreAttending === guests.length ? "confirmed" : "pending";
};

export const withDerivedAdminFields = (row: AdminRow): AdminRow => ({
  ...row,
  attendingCount: getAttendingCount(row),
  status: getStatus(row),
  needsTransport: getTransportCount(row) > 0,
  guests: safeGuests(row.guests) as AdminGuest[],
  extraGuests: safeGuests(row.extraGuests) as AdminGuest[],
});
