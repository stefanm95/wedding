import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import type { AdminRow } from "@/types/admin";

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
        const groupsMap = new Map();
        let invitedPeopleCount = 0;

        groupsSnap.forEach((doc) => {
          const g = doc.data();

          groupsMap.set(doc.id, g);

          // 🔥 COUNT REAL INVITED PEOPLE
          invitedPeopleCount += (g.members || []).length;
        });

        groupsSnap.forEach((doc) => {
          groupsMap.set(doc.id, doc.data());
        });

        const data: AdminRow[] = [];

        rsvpSnap.forEach((doc) => {
          const r = doc.data();
          const g = groupsMap.get(doc.id);

          if (!g) return;

          data.push({
            groupId: doc.id,
            familyLabel: g.familyLabel,

            invitedCount: r.totalGuests || g.maxGuests,
            attendingCount: r.attendingCount || 0,

            status: r.status,
            needsTransport: r.needsTransport || false,

            respondedAt: r.respondedAt?.toDate() || null,
          });

          groupsMap.delete(doc.id);
        });

        groupsMap.forEach((g, id) => {
          data.push({
            groupId: id,
            familyLabel: g.familyLabel,

            invitedCount: g.maxGuests,
            attendingCount: 0,

            status: "pending",
            needsTransport: false,
            respondedAt: null,
          });
        });

        setRows(data);
        setTotalInvitedPeople(invitedPeopleCount);
        setLoading(false);
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
