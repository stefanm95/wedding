import { normalizeGuests } from "@/domain/rsvp/normalizers";
import { getAttendingCount, getStatus, getTransportCount } from "@/domain/rsvp/selectors";
import { db } from "@/lib/firebase";
import type { AdminGuest, AdminRow } from "@/types/admin";
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function updateRsvpAdmin(data: AdminRow) {
  const rsvpRef = doc(db, "rsvps", data.groupId);
  const groupRef = doc(db, "guestGroups", data.groupId);

  const guests = normalizeGuests(data.guests) as AdminGuest[];
  const extraGuests = normalizeGuests(data.extraGuests) as AdminGuest[];
  const normalizedRow = { guests, extraGuests };

  const attendingCount = getAttendingCount(normalizedRow);
  const status = getStatus(normalizedRow);
  const needsTransport = getTransportCount(normalizedRow) > 0;

  const newHistoryEntry = {
    editedAt: new Date(),
    attendingCount,
    status,
    snapshot: {
      guests,
      extraGuests,
    },
  };

  await setDoc(
    rsvpRef,
    {
      groupId: data.groupId,
      guests,
      extraGuests,
      history: arrayUnion(newHistoryEntry),
    },
    { merge: true },
  );

  await updateDoc(groupRef, {
    hasResponded: true,
    attendingCount,
    needsTransport,
    respondedAt: serverTimestamp(),
  });
}
