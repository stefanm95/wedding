import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { AdminGuest, AdminRow } from "@/types/admin";

export function useAdminData() {
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInvitedPeople, setTotalInvitedPeople] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [groupsSnap, rsvpSnap] = await Promise.all([
          getDocs(collection(db, "guestGroups")),
          getDocs(collection(db, "rsvps")),
        ]);

        const groupsMap = new Map<string, any>();
        let invitedPeopleCount = 0;

        /* ---------------- GROUPS ---------------- */

        groupsSnap.forEach((doc) => {
          const g = doc.data();

          groupsMap.set(doc.id, g);
          invitedPeopleCount += (g.members || []).length;
        });

        /* ---------------- RSVPS ---------------- */

        const data: AdminRow[] = [];

        rsvpSnap.forEach((doc) => {
          const r = doc.data();
          const g = groupsMap.get(doc.id);

          if (!g) return;

          // ✅ normalize base guests
          const guests: AdminGuest[] = (r.guests || []).map((guest: any, i: number) => ({
            id: guest.id || `guest-${i}`,
            name: guest.name,
            attending: !!guest.attending,
            dietary: guest.dietary || "",
          }));

          // ✅ normalize extra guests
          const extraGuests: AdminGuest[] = (r.extraGuests || []).map((guest: any, i: number) => ({
            id: guest.id || `extra-${i}`,
            name: guest.name,
            attending: !!guest.attending,
            dietary: guest.dietary || "",
          }));

          const allGuests = [...guests, ...extraGuests];

          data.push({
            groupId: doc.id,
            familyLabel: g.familyLabel,

            invitedCount: g.members?.length || g.maxGuests,
            attendingCount: allGuests.filter((g) => g.attending).length,

            status: r.status || "pending",
            needsTransport: r.needsTransport || false,

            guests,
            extraGuests,

            maxGuests: g.maxGuests,
          });

          // ✅ IMPORTANT: remove handled group
          groupsMap.delete(doc.id);
        });

        /* ---------------- NON RESPONDED ---------------- */

        groupsMap.forEach((g, id) => {
          const guests: AdminGuest[] = (g.members || []).map((member: any, index: number) => ({
            id: member?.id || `guest-${index}`,
            name: typeof member === "string" ? member : member.name,
            attending: false,
            dietary: "",
          }));

          data.push({
            groupId: id,
            familyLabel: g.familyLabel,

            invitedCount: g.members?.length || g.maxGuests,
            attendingCount: 0,

            status: "pending",
            needsTransport: false,

            guests,
            extraGuests: [], // ✅ ALWAYS PRESENT

            maxGuests: g.maxGuests,
          });
        });

        setRows(data);
        setTotalInvitedPeople(invitedPeopleCount);
      } catch (err) {
        console.error("🔥 Admin fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { rows, loading, totalInvitedPeople };
}
