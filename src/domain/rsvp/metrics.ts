import type { AdminRow } from "@/types/admin";
import { getAttendingCount, getStatus, getTransportCount } from "./selectors";

export type RsvpMetrics = {
  totalGroups: number;
  totalMaxGuests: number;
  confirmedGroups: number;
  declinedGroups: number;
  pendingGroups: number;
  respondedGroups: number;
  totalAttendingPeople: number;
  transportPeople: number;
  occupancy: string;
};

export const getRsvpMetrics = (rows: AdminRow[]): RsvpMetrics => {
  const safeRows = Array.isArray(rows) ? rows : [];
  const totalMaxGuests = safeRows.reduce((sum, row) => sum + (row.maxGuests ?? row.invitedCount), 0);
  const totalAttendingPeople = safeRows.reduce((sum, row) => sum + getAttendingCount(row), 0);

  return {
    totalGroups: safeRows.length,
    totalMaxGuests,
    confirmedGroups: safeRows.filter((row) => getStatus(row) === "confirmed").length,
    declinedGroups: safeRows.filter((row) => getStatus(row) === "declined").length,
    pendingGroups: safeRows.filter((row) => getStatus(row) === "pending").length,
    respondedGroups: safeRows.filter((row) => {
      const status = getStatus(row);
      return status === "confirmed" || status === "declined";
    }).length,
    totalAttendingPeople,
    transportPeople: safeRows.reduce((sum, row) => sum + getTransportCount(row), 0),
    occupancy: `${totalAttendingPeople} / ${totalMaxGuests}`,
  };
};
