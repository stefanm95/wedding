import type { DietaryOption, GuestTransport, RSVPGuest } from "@/types/rsvp";

export type GuestInput = {
  id?: string;
  name?: string;
  attending?: boolean;
  dietary?: DietaryOption | string;
  dietaryNote?: string;
  transport?: Partial<GuestTransport>;
};

export type SubmissionInput = {
  groupId: string;
  guests?: GuestInput[];
  extraGuests?: GuestInput[];
  message?: string;
};

export type NormalizedSubmission = {
  groupId: string;
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];
  message: string;
};

const isDietaryOption = (value: unknown): value is DietaryOption =>
  value === "none" ||
  value === "vegetarian" ||
  value === "vegan" ||
  value === "menu-copii" ||
  value === "other";

const toGuestId = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeTransport = (transport?: Partial<GuestTransport>): GuestTransport => {
  if (!transport?.type || transport.type === "none") {
    return { type: "none" };
  }

  if (transport.type === "personal") {
    return { type: "personal" };
  }

  return {
    type: "bus",
    ...(transport.locationId ? { locationId: transport.locationId } : {}),
  };
};

export const normalizeGuest = (guest: GuestInput): RSVPGuest => {
  const name = guest.name?.trim() || "";
  const attending = typeof guest.attending === "boolean" ? guest.attending : false;
  const dietary = isDietaryOption(guest.dietary) ? guest.dietary : "none";

  return {
    id: guest.id || toGuestId(name),
    name,
    attending,
    dietary: attending ? dietary : "none",
    dietaryNote: attending && dietary === "other" ? guest.dietaryNote?.trim() || "" : "",
    transport: normalizeTransport(guest.transport),
  };
};

export const normalizeGuests = (guests?: GuestInput[]) =>
  Array.isArray(guests) ? guests.map(normalizeGuest) : [];

export const normalizeSubmission = ({
  groupId,
  guests,
  extraGuests,
  message,
}: SubmissionInput): NormalizedSubmission => ({
  groupId,
  guests: normalizeGuests(guests),
  extraGuests: normalizeGuests(extraGuests),
  message: message?.trim() || "",
});
