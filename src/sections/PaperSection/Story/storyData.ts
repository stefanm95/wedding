export type ItemType = "story" | "transition" | "event";

export type StoryItemType = {
  type?: ItemType;
  side?: "left" | "right";
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
    side: "left",
    title: "Totul a început...",
    text: "fără să știm, nu a fost o întâlnire planificată. Nu a fost un moment spectaculos. Dar dintr-o întâmplare simplă, a început ceva ce avea să devină totul.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder01_wuxuwc.jpg",
    date: "2021",
  },
  {
    side: "right",
    title: "Într-o zi obisnuita...",
    text: "timpul parcă s-a oprit, iar întrebarea aceea simplă a devenit începutul unui nou capitol.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder02_lb9ble.jpg",
    date: "2024",
  },
  {
    side: "left",
    title: "O lume construita împreuna",
    text: "Nu doar noi doi, ci toți cei care ne sunt alături. O familie, o poveste, o viață care crește în fiecare zi.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder03_fa7w1l.jpg",
    date: "2026",
  },
  // 📍 CEREMONIE
  {
    type: "event",
    side: "right",
    title: "Ceremonia religioasa",
    text: "Vom spune „DA” în fața lui Dumnezeu, într-un loc plin de liniște și binecuvântare.",
    location: "Biserica „Sfinții Trei Ierarhi” Fundeni",
    date: "22 August 2026",
    time: "16:00",
    image: "https://res.cloudinary.com/dswwhzem5/image/upload/v1777966368/biserica-3_ujfr6n.jpg",
    mapLink:
      "https://www.google.com/maps/place/Parohia+Sfin%C5%A3ii+Trei+Ierarhi/@44.4619434,26.1579387,16.5z/data=!4m14!1m7!3m6!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!2sParohia+Sfin%C5%A3ii+Trei+Ierarhi!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh!3m5!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },

  // 🌿 PETRECERE
  {
    type: "event",
    side: "left",
    title: "Petrecerea",
    text: "Vom sărbători iubirea noastră într-un cadru natural de poveste.",
    location: "Pădurile Regale",
    date: "22 August 2026",
    time: "18:30",
    image: "https://res.cloudinary.com/dswwhzem5/image/upload/v1777536840/restaurant_dog2ak.jpg",
    mapLink:
      "https://www.google.com/maps/place/P%C4%83durile+Regale/@44.7059572,26.3230083,14.25z/data=!4m6!3m5!1s0x40b21bab420f8689:0x6fe826cbb1c75235!8m2!3d44.7077006!4d26.3359205!16s%2Fg%2F11bw3dtk65?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
];

export const storyItems = storyData.filter((i) => i.type !== "event");
export const eventItems = storyData.filter((i) => i.type === "event");
