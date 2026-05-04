export type AdminUser = {
  uid: string;
  email: string;
  role: "admin";
};

export type AdminGuest = {
  id: string;
  name: string;
  attending: boolean;
  dietary?: string;
};

export type TransportType = "none" | "bus" | "personal";

export type AdminHistoryEntry = {
  editedAt: any;
  attendingCount: number;
  status: "confirmed" | "declined" | "pending";
  snapshot: {
    guests: AdminGuest[];
    extraGuests: AdminGuest[];
  };
};

export type AdminRow = {
  groupId: string;
  familyLabel: string;

  invitedCount: number;
  attendingCount: number;

  status: "confirmed" | "declined" | "pending";

  needsTransport: boolean;

  transport?: {
    type: TransportType;
  };

  guests?: AdminGuest[];
  extraGuests: AdminGuest[];

  maxGuests?: number;

  history?: AdminHistoryEntry[]; // ✅ ADD THIS
};

export type AdminUpdatePayload = {
  groupId: string;
  attendingCount: number;
  status: "confirmed" | "declined" | "pending";
  needsTransport: boolean;

  guests: any[];
  extraGuests?: any[];
  transport?: any;
};
