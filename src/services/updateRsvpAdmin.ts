import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import type { AdminRow } from "@/types/admin";

export async function updateRsvpAdmin(data: AdminRow) {
  const ref = doc(db, "rsvps", data.groupId);

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

  await setDoc(
    ref,
    {
      groupId: data.groupId,

      guests,
      extraGuests,

      attendingCount,
      status,

      transport,
      needsTransport: transport.type !== "none",

      respondedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
