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
    title: "Totul a început fără să știm",
    text: "Nu a fost o întâlnire planificată. Nu a fost un moment spectaculos. Dar dintr-o întâmplare simplă, a început ceva ce avea să devină totul.",
    image: "/public/assets/images/couple/couple-placeholder01.png",
    date: "2021",
  },
  {
    title: "Un moment care a schimbat totul",
    text: "Într-o zi obișnuită, timpul parcă s-a oprit. Iar întrebarea aceea simplă a devenit începutul unui nou capitol.",
    image: "public/assets/images/couple/couple-placeholder02.png",
    date: "2024",
  },
  {
    title: "O lume construită împreună",
    text: "Nu doar noi doi, ci toți cei care ne sunt alături. O familie, o poveste, o viață care crește în fiecare zi.",
    image: "public/assets/images/couple/couple-placeholder03.png",
    date: "2026",
  },
  {
    type: "transition",
    title: "Iar acum…",
    text: "Vă invităm să fiți parte din ziua în care povestea noastră continuă.",
  },

  // 📍 CEREMONIE
  {
    type: "event",
    title: "Ceremonia religioasă",
    text: "Vom spune „DA” în fața lui Dumnezeu, într-un loc plin de liniște și binecuvântare.",
    location: "Biserica X",
    date: "20 August 2026",
    time: "16:00",
    image: "/images/church.jpg",
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
    image: "/images/padurile-regale.jpg",
    mapLink: "https://maps.google.com",
  },
];

export const storyItems = storyData.filter((i) => i.type !== "event");
export const eventItems = storyData.filter((i) => i.type === "event");
