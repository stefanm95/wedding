import { normalizeGuests } from "@/domain/rsvp/normalizers";
import { withDerivedAdminFields } from "@/domain/rsvp/selectors";
import { db } from "@/lib/firebase";
import type { AdminGuest, AdminRow } from "@/types/admin";
import type { GuestGroupMember } from "@/types/rsvp";
import { getMemberId, getMemberName } from "@/utils/rsvpValidation";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

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

        groupsSnap.forEach((doc) => {
          const group = doc.data();
          const members = Array.isArray(group.members) ? group.members : [];

          groupsMap.set(doc.id, group);
          invitedPeopleCount += members.length;
        });

        const data: AdminRow[] = [];

        rsvpSnap.forEach((doc) => {
          const rsvp = doc.data();
          const group = groupsMap.get(doc.id);

          if (!group) {
            return;
          }

          const members = Array.isArray(group.members) ? group.members : [];
          const guests = normalizeGuests(rsvp.guests) as AdminGuest[];
          const extraGuests = normalizeGuests(rsvp.extraGuests) as AdminGuest[];

          data.push(
            withDerivedAdminFields({
              groupId: doc.id,
              familyLabel: group.familyLabel,
              invitedCount: members.length || group.maxGuests,
              attendingCount: 0,
              status: "pending",
              needsTransport: false,
              hasResponded: true,
              guests,
              extraGuests,
              maxGuests: group.maxGuests,
              history: rsvp.history || [],
            }),
          );

          groupsMap.delete(doc.id);
        });

        groupsMap.forEach((group, id) => {
          const members = Array.isArray(group.members) ? group.members : [];
          const guests: AdminGuest[] = (members as GuestGroupMember[]).map((member) => ({
            id: getMemberId(member),
            name: getMemberName(member),
            attending: false,
            dietary: "none",
            transport: { type: "none" },
          }));

          data.push(
            withDerivedAdminFields({
              groupId: id,
              familyLabel: group.familyLabel,
              invitedCount: members.length || group.maxGuests,
              attendingCount: 0,
              status: "pending",
              needsTransport: false,
              hasResponded: false,
              guests,
              extraGuests: [],
              maxGuests: group.maxGuests,
              history: [],
            }),
          );
        });

        setRows(data);
        setTotalInvitedPeople(invitedPeopleCount);
      } catch (err) {
        console.error("Admin fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { rows, loading, totalInvitedPeople };
}
