export type AdminUser = {
  uid: string;
  email: string;
  role: "admin";
};

export type AdminRow = {
  groupId: string;
  familyLabel: string;

  invitedCount: number;
  attendingCount: number;

  status: "pending" | "confirmed" | "declined";

  needsTransport: boolean;

  respondedAt: Date | null;
};
