export const defaultRSVP: RSVPFormData = {
  name: "",
  attending: "yes",
  guests: [
    {
      name: "",
      dietary: "none",
    },
  ],
  message: "",
  transport: {
    required: false,
    type: "none",
  },
};

export type RSVPFormData = {
  name: string;
  attending: RSVPStatus;

  guests: RSVPGuest[];

  message?: string;

  transport?: RSVPTransport;

  createdAt?: number;
};

export type RSVPStatus = "yes" | "no";
export type TransportType = "none" | "bus" | "personal";

export type DietaryOption =
  | "none"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "other";

export type RSVPGuest = {
  name: string;
  dietary?: DietaryOption;
};

export type RSVPTransport = {
  required: boolean;
  type?: TransportType;

  // opțional (future-proof)
  pickupLocation?: string;
};
