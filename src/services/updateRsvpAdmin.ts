import { db } from "@/lib/firebase";
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import type { AdminRow } from "@/types/admin";

export async function updateRsvpAdmin(data: AdminRow) {
  const rsvpRef = doc(db, "rsvps", data.groupId);
  const groupRef = doc(db, "guestGroups", data.groupId);

  const guests = data.guests || [];
  const extraGuests = data.extraGuests || [];

  const coreAttending = guests.filter((g) => g.attending).length;

  const attendingCount = coreAttending + extraGuests.filter((g) => g.attending).length;

  const status =
    coreAttending === 0 ? "declined" : coreAttending === guests.length ? "confirmed" : "pending";

  const allGuests = [...guests, ...extraGuests];

  const attendingGuests = allGuests.filter((g) => g.attending);

  const needsTransport = attendingGuests.some((guest) => guest.transport?.type === "bus");

  /* ---------------- BUILD NEW HISTORY ENTRY ---------------- */

  const newHistoryEntry = {
    editedAt: new Date(),
    attendingCount,
    status,
    snapshot: {
      guests,
      extraGuests,
    },
  };

  /* ---------------- RSVP WRITE ---------------- */

  await setDoc(
    rsvpRef,
    {
      groupId: data.groupId,

      guests: guests || [],
      extraGuests: extraGuests || [],

      attendingCount,
      status,

      needsTransport,

      respondedAt: serverTimestamp(),

      history: arrayUnion(newHistoryEntry),
    },
    { merge: true },
  );

  /* ---------------- GUEST GROUP ---------------- */

  await updateDoc(groupRef, {
    hasResponded: true,
    attendingCount,
    needsTransport,
    respondedAt: serverTimestamp(),
  });
}
