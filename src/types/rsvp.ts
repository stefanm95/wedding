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
  pickupLocation?: string;
};

export type RSVPFormData = {
  name: string;
  attending: RSVPStatus;
  guests: RSVPGuest[];
  message?: string;
  transport?: RSVPTransport;
  createdAt?: number;
};

// 🔥 DEV helper
const DEV_GUESTS: RSVPGuest[] = [
  { name: "Ștefan Moise", dietary: "none" },
  { name: "Invitat +1", dietary: "vegetarian" },
];

const isDev = import.meta.env.DEV;

export const defaultRSVP: RSVPFormData = {
  name: "",
  attending: "yes",
  guests: isDev ? DEV_GUESTS : [{ name: "", dietary: "none" }],
  message: "",
  transport: {
    required: false,
    type: "none",
  },
};
