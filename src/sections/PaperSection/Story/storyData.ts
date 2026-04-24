export type ItemType = "story" | "transition" | "event";

export type StoryItemType = {
  type?: ItemType;
  title: string;
  text: string;
  image?: string;
  date?: string;
  location?: string;
  mapLink?: string;
};

export const storyData: StoryItemType[] = [
  {
    title: "Cum ne-am întâlnit",
    text: "Ne-am întâlnit într-un mod simplu, dar care avea să ne schimbe viața...",
    image: "/images/story-1.jpg",
  },
  {
    title: "Cum m-a cerut",
    text: "Într-o zi care părea obișnuită, totul s-a transformat într-un moment magic...",
    image: "/images/story-2.jpg",
  },
  {
    title: "Familia noastră",
    text: "Astăzi suntem înconjurați de oameni care ne definesc povestea...",
    image: "/images/story-3.jpg",
  },
  // 🔥 TRANZIȚIE (foarte importantă pentru flow)
  {
    type: "transition",
    title: "Începem un nou capitol",
    text: "Vă invităm să fiți alături de noi în ziua în care povestea noastră continuă...",
  },

  // 📍 CEREMONIE
  {
    type: "event",
    title: "Ceremonia religioasă",
    text: "Vom spune „DA” în fața lui Dumnezeu, într-un loc plin de liniște și binecuvântare.",
    location: "Biserica X",
    date: "20 August 2026",
    image: "/images/church.jpg",
    mapLink: "https://maps.google.com",
  },

  // 🌿 PETRECERE
  {
    type: "event",
    title: "Petrecerea",
    text: "Vom sărbători iubirea noastră într-un cadru natural de poveste.",
    location: "Pădurile Regale",
    date: "20 August 2026",
    image: "/images/padurile-regale.jpg",
    mapLink: "https://maps.google.com",
  },
];

export const timelineData = [
  {
    type: "transport",
    title: "Plecare cu autobuzul",
    time: "14:30",
    location: "Piața Victoriei",
    note: "Autobuz pus la dispoziție pentru invitati",
  },
  {
    type: "event",
    title: "Ceremonie religioasă",
    time: "16:00",
    location: "Biserica X",
    mapLink: "https://maps.google.com/...",
  },
  {
    type: "event",
    title: "Recepție",
    time: "18:00",
    location: "Restaurant Y",
    mapLink: "https://maps.google.com/...",
  },
  {
    type: "transport",
    title: "Întoarcere",
    time: "02:00",
    note: "Autobuz spre București",
  },
];
