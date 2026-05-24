import { db } from "@/lib/firebase";
import type { FirestoreRsvp, RSVPGuest } from "@/types/rsvp";
import { normalizeSubmission } from "@/domain/rsvp/normalizers";
import { getAttendingCount } from "@/domain/rsvp/selectors";
import { getMemberId } from "@/utils/rsvpValidation";
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

    const submission = normalizeSubmission({ groupId, guests, extraGuests, message });
    const cleanGuests = submission.guests;
    const cleanExtraGuests = submission.extraGuests.filter(
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

    const normalizedRow = {
      guests: cleanGuests,
      extraGuests: cleanExtraGuests,
    };

    const confirmedCount = getAttendingCount(normalizedRow);
    const totalGuests = cleanGuests.length + cleanExtraGuests.length;

    if (confirmedCount > group.maxGuests) {
      throw new Error("Depasire limita invitati");
    }

    const data: FirestoreRsvp = {
      groupId,
      guests: cleanGuests,
      extraGuests: cleanExtraGuests,
      createdAt: serverTimestamp(),

      message: submission.message,
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
