export type TransportLocationId = "Obor" | "Biserica";

export type TransportLocation = {
  id: TransportLocationId;
  label: string;
  departureTime: string;
  departurePlace: string;
  description?: string;
};

export const TRANSPORT_LOCATIONS: TransportLocation[] = [
  {
    id: "Obor",
    label: "Transport de la Obor",
    departureTime: "17:30",
    departurePlace:
      "https://www.google.com/maps/place/Sector+2,+Bucharest/@44.4506053,26.1232906,785m/data=!3m2!1e3!4b1!4m14!1m7!3m6!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!2sParohia+Sfin%C5%A3ii+Trei+Ierarhi!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh!3m5!1s0x40b1f8ced5c75ef5:0x25c4e5a8a6499551!8m2!3d44.4506053!4d26.1258709!16s%2Fg%2F11c2w5xcbh?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
    description: "Te rugăm să fii prezent cu 10 minute înainte.",
  },

  {
    id: "Biserica",
    label: "Transport de la Biserică",
    departureTime: "17:30",
    departurePlace:
      "https://www.google.com/maps/place/Parohia+Sfin%C5%A3ii+Trei+Ierarhi/@44.4624468,26.1563828,17z/data=!3m1!4b1!4m6!3m5!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
    description: "Transport către locația petrecerii.",
  },
];
