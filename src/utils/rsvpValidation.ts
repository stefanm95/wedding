import { normalizeGuests } from "@/domain/rsvp/normalizers";
import { getAttendingCount, getAttendingGuests } from "@/domain/rsvp/selectors";
import type { GuestGroupMember, RSVPFormData, RSVPGuest } from "@/types/rsvp";

export { normalizeGuest, normalizeGuests } from "@/domain/rsvp/normalizers";

export type ValidationResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

export const toGuestId = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getMemberName = (member: GuestGroupMember) =>
  typeof member === "string" ? member : member.name;

export const getMemberId = (member: GuestGroupMember) =>
  typeof member === "string" ? toGuestId(member) : member.id || toGuestId(member.name);

export const validateSelectedGroup = (form: RSVPFormData): ValidationResult => {
  if (!form.groupId.trim()) {
    return { ok: false, message: "Selecteaza un grup valid." };
  }

  if (!Array.isArray(form.guests) || form.guests.length === 0) {
    return { ok: false, message: "Grupul selectat nu are invitati." };
  }

  return { ok: true };
};

export const validateGuests = (form: RSVPFormData): ValidationResult => {
  const cleanGuests = normalizeGuests(form.guests);
  const cleanExtraGuests = normalizeGuests(form.extraGuests);

  if (!cleanGuests.every((guest) => guest.id && guest.name.trim())) {
    return { ok: false, message: "Lista de invitati este incompleta." };
  }

  if (!cleanGuests.every((guest) => typeof guest.attending === "boolean")) {
    return { ok: false, message: "Confirma raspunsul pentru fiecare invitat." };
  }

  if (cleanExtraGuests.some((guest) => guest.attending && !guest.name)) {
    return { ok: false, message: "Completeaza numele invitatilor suplimentari." };
  }

  if (cleanGuests.some((g) => g.attending && g.dietary === "other" && !g.dietaryNote?.trim())) {
    return {
      ok: false,
      message: "Te rugăm să specifici restricțiile alimentare.",
    };
  }

  if (
    cleanExtraGuests.some((g) => g.attending && g.dietary === "other" && !g.dietaryNote?.trim())
  ) {
    return {
      ok: false,
      message: "Completează restricțiile pentru invitații suplimentari.",
    };
  }

  const confirmedCount = getAttendingCount({
    guests: cleanGuests,
    extraGuests: cleanExtraGuests,
  });

  if (confirmedCount === 0 && form.attending !== false) {
    return { ok: false, message: "Confirma cel putin un participant." };
  }

  if (confirmedCount > form.maxGuests) {
    return { ok: false, message: "Ai depasit limita de invitati." };
  }

  const attendingGuests = getAttendingGuests({
    guests: cleanGuests,
    extraGuests: cleanExtraGuests,
  }) as RSVPGuest[];

  const invalidTransport = attendingGuests.some((guest) => {
    if (!guest.transport) {
      return true;
    }

    if (guest.transport.type !== "bus") {
      return false;
    }

    return !guest.transport.locationId;
  });

  if (invalidTransport) {
    return {
      ok: false,
      message: "Completează transportul pentru invitați.",
    };
  }

  return { ok: true };
};

export const validateRsvpForm = (form: RSVPFormData): ValidationResult => {
  const selectedGroup = validateSelectedGroup(form);

  if (!selectedGroup.ok) {
    return selectedGroup;
  }

  return validateGuests(form);
};
