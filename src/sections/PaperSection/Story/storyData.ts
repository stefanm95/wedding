export type ItemType = "story" | "transition" | "event";

export type StoryItemType = {
  type?: ItemType;
  title: string;
  text: string;
  image?: string;
  date?: string;
  time?: string;
  location?: string;
  mapLink?: string;
};

export const storyData: StoryItemType[] = [
  {
    title: "Totul a început...",
    text: "fără să știm, nu a fost o întâlnire planificată. Nu a fost un moment spectaculos. Dar dintr-o întâmplare simplă, a început ceva ce avea să devină totul.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder01_wuxuwc.jpg",
    date: "2021",
  },
  {
    title: "Într-o zi obisnuita...",
    text: "timpul parcă s-a oprit, iar întrebarea aceea simplă a devenit începutul unui nou capitol.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder02_lb9ble.jpg",
    date: "2024",
  },
  {
    title: "O lume construita împreuna",
    text: "Nu doar noi doi, ci toți cei care ne sunt alături. O familie, o poveste, o viață care crește în fiecare zi.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder03_fa7w1l.jpg",
    date: "2026",
  },
  // 📍 CEREMONIE
  {
    type: "event",
    title: "Ceremonia religioasa",
    text: "Vom spune „DA” în fața lui Dumnezeu, într-un loc plin de liniște și binecuvântare.",
    location: "Biserica X",
    date: "22 August 2026",
    time: "16:00",
    image: "/images/locatii/church.jpg",
    mapLink: "https://maps.google.com",
  },

  // 🌿 PETRECERE
  {
    type: "event",
    title: "Petrecerea",
    text: "Vom sărbători iubirea noastră într-un cadru natural de poveste.",
    location: "Pădurile Regale",
    date: "22 August 2026",
    time: "19:00",
    image: "/images/locatii/padurile-regale.jpg",
    mapLink: "https://maps.google.com",
  },
];

export const storyItems = storyData.filter((i) => i.type !== "event");
export const eventItems = storyData.filter((i) => i.type === "event");
