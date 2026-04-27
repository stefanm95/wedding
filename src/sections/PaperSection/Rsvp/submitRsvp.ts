import { db } from "@/lib/firebase";
import type { RSVPGuest, RSVPTransport } from "@/types/rsvp";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type SubmitRsvpParams = {
  groupId: string;
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];
  message?: string;
  transport?: RSVPTransport;
};

export async function submitRsvp({
  groupId,
  guests,
  extraGuests,
  message,
  transport,
}: SubmitRsvpParams) {
  const groupRef = doc(db, "guestGroups", groupId);
  const groupSnap = await getDoc(groupRef);

  if (!groupSnap.exists()) {
    throw new Error("Grup inexistent");
  }

  const group = groupSnap.data();

  const rsvpRef = doc(db, "rsvps", groupId);
  const rsvpSnap = await getDoc(rsvpRef);

  if (rsvpSnap.exists()) {
    throw new Error("RSVP deja trimis");
  }

  // 🔥 VALIDARE MEMBRI
  const validMembers: string[] = group.members || [];

  const invalidGuests = guests.filter((g) => !validMembers.includes(g.name));

  if (invalidGuests.length > 0) {
    throw new Error("Invitati invalizi");
  }

  // 🔥 VALIDARE MAX
  const confirmedCount = guests.filter((g) => g.attending === "yes").length;

  const totalGuests = confirmedCount + (extraGuests?.length || 0);

  if (totalGuests > group.maxGuests) {
    throw new Error("Depasire limita invitati");
  }

  // 🔥 SAVE
  await setDoc(rsvpRef, {
    groupId,
    familyLabel: group.familyLabel,

    guests,
    extraGuests,

    message: message || "",
    transport: transport || null,

    createdAt: serverTimestamp(),
  });
}
