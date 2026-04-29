import { db } from "@/lib/firebase";
import type { FirestoreRsvp, RSVPGuest, RSVPTransport } from "@/types/rsvp";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

  // VALIDARE
  const validMembers: string[] = group.members || [];

  const invalidGuests = guests.filter((g) => !validMembers.includes(g.name));

  if (invalidGuests.length > 0) {
    throw new Error("Invitati invalizi");
  }

  const confirmedCount =
    guests.filter((g) => g.attending).length + extraGuests.filter((g) => g.attending).length;

  if (confirmedCount > group.maxGuests) {
    throw new Error("Depasire limita invitati");
  }

  if (confirmedCount > group.maxGuests) {
    throw new Error("Depasire limita invitati");
  }

  const data: FirestoreRsvp = {
    groupId,
    guests,
    extraGuests, // 🔥
    message: message || "",
    transport: transport ?? null,
    createdAt: serverTimestamp(),
  };

  // 🔥 UPDATE GROUP FLAG
  await updateDoc(groupRef, {
    hasResponded: true,
  });
  await setDoc(rsvpRef, data, { merge: true });

  console.log("SUBMITTING RSVP", data);
}
