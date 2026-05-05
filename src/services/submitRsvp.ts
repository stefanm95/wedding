import { db } from "@/lib/firebase";
import type { FirestoreRsvp, RSVPGuest, RSVPTransport } from "@/types/rsvp";
import { getMemberId, normalizeGuests } from "@/utils/rsvpValidation";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

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

    const needsTransport = transport?.type === "bus";

    if (transport?.type === "bus") {
      if (!transport.seatsRequested || transport.seatsRequested < 1) {
        throw new Error("Transport invalid");
      }

      if (transport.seatsRequested > confirmedCount) {
        throw new Error("Prea multe locuri solicitate");
      }
    }

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
      needsTransport,
      status,
      createdAt: serverTimestamp(),
      respondedAt: serverTimestamp(),

      message: message?.trim() || "",
      transport: transport ?? null,
    };

    tx.set(rsvpRef, data, { merge: true });

    tx.update(groupRef, {
      hasResponded: true,
      attendingCount: confirmedCount,
      totalGuests,
      needsTransport,
      respondedAt: serverTimestamp(),
    });
  });
}
