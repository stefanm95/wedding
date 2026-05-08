import { db } from "@/lib/firebase";
import type { FirestoreRsvp, RSVPGuest } from "@/types/rsvp";
import { getMemberId, normalizeGuests } from "@/utils/rsvpValidation";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

type SubmitRsvpParams = {
  groupId: string;
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];
  message?: string;
};

export async function submitRsvp({ groupId, guests, extraGuests, message }: SubmitRsvpParams) {
  const groupRef = doc(db, "guestGroups", groupId);
  const rsvpRef = doc(db, "rsvps", groupId);

  await runTransaction(db, async (tx) => {
    const groupSnap = await tx.get(groupRef);

    if (!groupSnap.exists()) {
      throw new Error("Grup inexistent");
    }

    const group = groupSnap.data();

    const cleanGuests = normalizeGuests(guests);
    const cleanExtraGuests = normalizeGuests(extraGuests).filter(
      (guest) => guest.name || guest.attending,
    );

    const validMemberIds = new Set((group.members || []).map(getMemberId));
    const invalidGuests = cleanGuests.filter((guest) => !validMemberIds.has(guest.id));

    if (invalidGuests.length > 0) {
      throw new Error("Invitati invalizi");
    }

    if (cleanExtraGuests.some((guest) => guest.attending && !guest.name)) {
      throw new Error("Invitati suplimentari incompleti");
    }

    const confirmedGuests = [
      ...cleanGuests.filter((g) => g.attending),
      ...cleanExtraGuests.filter((g) => g.attending),
    ];

    const confirmedCount = confirmedGuests.length;
    const totalGuests = cleanGuests.length + cleanExtraGuests.length;

    // 🔥 allow decline
    const status = confirmedCount > 0 ? "confirmed" : "declined";

    if (confirmedCount > group.maxGuests) {
      throw new Error("Depasire limita invitati");
    }

    const needsTransport = confirmedGuests.some((guest) => guest.transport?.type === "bus");

    const data: FirestoreRsvp & {
      attendingCount: number;
      totalGuests: number;
      needsTransport: boolean;
      status: "confirmed" | "declined";
      respondedAt: any;
    } = {
      groupId,
      guests: cleanGuests,
      extraGuests: cleanExtraGuests,

      attendingCount: confirmedCount,
      totalGuests,
      status,
      needsTransport,
      createdAt: serverTimestamp(),
      respondedAt: serverTimestamp(),

      message: message?.trim() || "",
    };

    tx.set(rsvpRef, data, { merge: true });

    tx.update(groupRef, {
      hasResponded: true,
      attendingCount: confirmedCount,
      totalGuests,
      respondedAt: serverTimestamp(),
    });
  });
}
