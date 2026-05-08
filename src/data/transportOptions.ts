export type TransportLocationId = "bucuresti" | "biserica";

export type TransportLocation = {
  id: TransportLocationId;
  label: string;
  departureTime: string;
  departurePlace: string;
  description?: string;
};

export const TRANSPORT_LOCATIONS: TransportLocation[] = [
  {
    id: "bucuresti",
    label: "Transport din București",
    departureTime: "15:30",
    departurePlace: "Piața Unirii",
    description: "Te rugăm să fii prezent cu 10 minute înainte.",
  },

  {
    id: "biserica",
    label: "Transport de la biserică",
    departureTime: "17:15",
    departurePlace: "Biserica Sfinții Trei Ierarhi",
    description: "Transport către locația petrecerii.",
  },
];
