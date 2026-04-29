export type RSVPStatus = true | false;

export type TransportType = "none" | "bus" | "personal";

export type DietaryOption = "none" | "vegetarian" | "vegan" | "gluten-free" | "other";

export type RSVPGuest = {
  name: string;
  attending: RSVPStatus;
  dietary?: DietaryOption;
};

export type RSVPTransport = {
  type: TransportType;
  pickupLocation?: string;
};

export type RSVPFormData = {
  groupId: string; // 🔥 adauga asta
  name: string;
  attending: RSVPStatus;

  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];

  maxGuests: number;

  message?: string;
  transport?: RSVPTransport;

  createdAt?: number;
};

export type GuestGroup = {
  id: string;
  familyLabel: string;
  members: string[];
  maxGuests: number;
  hasResponded: boolean;
  representative?: string;
};
export type FirestoreRsvp = {
  groupId: string;
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];
  message?: string;
  transport?: RSVPTransport | null;
  createdAt: any;
};

export const defaultRSVP: RSVPFormData = {
  groupId: "",
  name: "",
  attending: true,
  guests: [],
  extraGuests: [],
  maxGuests: 0,
  message: "",
  transport: {
    type: "none",
  },
};
