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

    if (confirmedCount === 0) {
      throw new Error("Niciun participant confirmat");
    }

    if (confirmedCount > group.maxGuests) {
      throw new Error("Depasire limita invitati");
    }

    // 🔥 NEW: flattened list (admin friendly)
    const allGuests = [...cleanGuests, ...cleanExtraGuests];

    // 🔥 NEW: total guests declared (not just attending)
    const totalGuests = allGuests.length;

    // 🔥 NEW: transport flag (queryable)
    const needsTransport = transport?.type === "bus";

    const data: FirestoreRsvp & {
      attendingCount: number;
      totalGuests: number;
      allGuests: RSVPGuest[];
      needsTransport: boolean;
      respondedAt: any;
    } = {
      groupId,
      guests: cleanGuests,
      extraGuests: cleanExtraGuests,

      // 🔥 NEW FIELDS
      allGuests,
      attendingCount: confirmedCount,
      totalGuests,
      needsTransport,
      respondedAt: serverTimestamp(),

      message: message?.trim() || "",
      transport: transport ?? null,
      createdAt: serverTimestamp(),
    };

    tx.set(rsvpRef, data, { merge: true });

    // 🔥 Upgrade group index (VERY IMPORTANT FOR ADMIN)
    tx.update(groupRef, {
      hasResponded: true,
      attendingCount: confirmedCount,
      totalGuests,
      needsTransport,
      respondedAt: serverTimestamp(),
    });
  });
}
