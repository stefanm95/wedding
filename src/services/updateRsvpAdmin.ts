import { db } from "@/lib/firebase";
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import type { AdminRow } from "@/types/admin";

export async function updateRsvpAdmin(data: AdminRow) {
  const rsvpRef = doc(db, "rsvps", data.groupId);
  const groupRef = doc(db, "guestGroups", data.groupId);

  const guests = data.guests || [];
  const extraGuests = data.extraGuests || [];

  const allGuests = [...guests, ...extraGuests];

  const attendingCount = allGuests.filter((g) => g.attending).length;

  const status =
    attendingCount === 0
      ? "declined"
      : attendingCount === allGuests.length
        ? "confirmed"
        : "pending";

  const transport = data.transport ?? {
    type: data.needsTransport ? "bus" : "none",
  };

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

      transport,
      needsTransport: transport.type !== "none",

      respondedAt: serverTimestamp(),

      history: arrayUnion(newHistoryEntry),
    },
    { merge: true },
  );

  /* ---------------- GUEST GROUP ---------------- */

  await updateDoc(groupRef, {
    hasResponded: true,
    attendingCount,
    needsTransport: transport.type !== "none",
    respondedAt: serverTimestamp(),
  });
}
