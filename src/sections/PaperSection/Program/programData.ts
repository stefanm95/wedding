export type ProgramItemType = {
  type: "transport" | "event";
  title: string;
  time: string;
  location?: string;
  note?: string;
  mapLink?: string;
};

export const programData: ProgramItemType[] = [
  {
    type: "event",
    title: "Ceremonie religioasă",
    time: "16:00",
    location: "Biserica „Sfinții Trei Ierarhi” Fundeni",
    mapLink:
      "https://www.google.com/maps/place/Parohia+Sfin%C5%A3ii+Trei+Ierarhi/@44.4619434,26.1579387,16.5z/data=!4m14!1m7!3m6!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!2sParohia+Sfin%C5%A3ii+Trei+Ierarhi!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh!3m5!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    type: "transport",
    title: "Plecare cu autobuzul",
    time: "17:30",
    location: "Piața Victoriei | Biserica Fundeni",
    note: "Autobuz pus la dispoziție pentru invitati",
  },
  {
    type: "event",
    title: "Recepție",
    time: "18:30",
    location: "Restaurant Pădurile Regale",
    mapLink:
      "https://www.google.com/maps/place/P%C4%83durile+Regale/@44.7059572,26.3230083,14.25z/data=!4m6!3m5!1s0x40b21bab420f8689:0x6fe826cbb1c75235!8m2!3d44.7077006!4d26.3359205!16s%2Fg%2F11bw3dtk65?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    type: "transport",
    title: "Întoarcere",
    time: "02:00",
    location: "Restaurant Pădurile Regale",
    note: "Autobuz spre București",
  },
];
