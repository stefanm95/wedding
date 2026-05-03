import type { GuestGroupMember, RSVPFormData, RSVPGuest } from "@/types/rsvp";

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

export const normalizeGuest = (guest: RSVPGuest): RSVPGuest => ({
  id: guest.id || toGuestId(guest.name),
  name: guest.name.trim(),
  attending: guest.attending,
  dietary: guest.attending ? guest.dietary || "none" : "none",
});

export const normalizeGuests = (guests: RSVPGuest[]) => guests.map(normalizeGuest);

export const validateSelectedGroup = (form: RSVPFormData): ValidationResult => {
  if (!form.groupId.trim()) {
    return { ok: false, message: "Selecteaza un grup valid." };
  }

  if (form.guests.length === 0) {
    return { ok: false, message: "Grupul selectat nu are invitati." };
  }

  return { ok: true };
};

export const validateGuests = (form: RSVPFormData): ValidationResult => {
  if (!form.guests.every((guest) => guest.id && guest.name.trim())) {
    return { ok: false, message: "Lista de invitati este incompleta." };
  }

  if (!form.guests.every((guest) => typeof guest.attending === "boolean")) {
    return { ok: false, message: "Confirma raspunsul pentru fiecare invitat." };
  }

  const cleanExtraGuests = form.extraGuests.map(normalizeGuest);

  if (cleanExtraGuests.some((guest) => guest.attending && !guest.name)) {
    return { ok: false, message: "Completeaza numele invitatilor suplimentari." };
  }

  const confirmedCount =
    form.guests.filter((guest) => guest.attending).length +
    cleanExtraGuests.filter((guest) => guest.attending).length;

  // 🔥 allow decline ONLY if explicitly chosen
  if (confirmedCount === 0 && form.attending !== false) {
    return { ok: false, message: "Confirma cel putin un participant." };
  }

  if (confirmedCount > form.maxGuests) {
    return { ok: false, message: "Ai depasit limita de invitati." };
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
