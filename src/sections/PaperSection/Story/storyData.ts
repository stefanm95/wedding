export type ItemType = "story" | "transition" | "event";

export type StoryItemType = {
  type?: ItemType;
  side?: "left" | "right";
  title: string;
  content: StoryBlock[];
  image?: string;
  date?: string;
  time?: string;
  location?: string;
  mapLink?: string;
  offset?: StoryOffset;
};

type StoryBlock =
  | { type: "paragraph"; text: string }
  | { type: "highlight"; text: string }
  | { type: "quote"; text: string }
  | { type: "spacer" };

type StoryOffset = {
  wrapper?: string;
  text?: string;
  image?: string;
};

export const storyData: StoryItemType[] = [
  {
    side: "left",
    title: "Totul a început...",
    offset: {
      wrapper: "md:-mt-24 lg:-mt-24 md:px-6",
      text: "md:-translate-y-8 lg:-translate-y-8 xl:translate-y-44",
      image: "lg:translate-y-40 ",
    },
    content: [
      {
        type: "paragraph",
        text: "Cu o invitație simplă, aproape banală, între două prietene:",
      },
      {
        type: "quote",
        text: "Hai la film!",
      },
      {
        type: "paragraph",
        text: "Iar uneori, cele mai mici gesturi deschid cele mai mari povești.",
      },

      {
        type: "paragraph",
        text: "Într-o zi în care gândurile Denisei aveau nevoie de o pauză de la paginile de învățat, a înflorit dorința de a evada într-un film.",
      },
      {
        type: "paragraph",
        text: "Miruna, ca un mesager al întâmplării, i-a propus cinematograful din Plazza Mall și filmul Puss in Boots.",
      },

      {
        type: "paragraph",
        text: "În același timp, pe un fir paralel al destinului, dorința lui Iulian nu îi aparținea lui.",
      },
      {
        type: "paragraph",
        text: "Ci prietenului său Dorico, care dorea să revadă un film vechi, premiat, revenit pe marile ecrane în același cinematograf.",
      },

      {
        type: "highlight",
        text: "Două filme. Două începuturi. Un singur loc.",
      },

      {
        type: "paragraph",
        text: "Când filmul Denisei se terminase, iar al lui Iulian abia urma să înceapă, drumurile lor s-au intersectat pentru prima dată.",
      },
      {
        type: "paragraph",
        text: "Nu într-un cadru grandios, ci pe o scară rulantă — undeva între „început” și „pentru totdeauna”.",
      },

      {
        type: "highlight",
        text: "Ea cobora. El urca.",
      },

      {
        type: "paragraph",
        text: "În timp ce secundele pe scara rulantă se scurgeau, Iulian i-a recunoscut pe Miruna și iubitul ei George.",
      },
      {
        type: "paragraph",
        text: "Iar Denisa… Denisa a observat altceva.",
      },
      {
        type: "paragraph",
        text: "Sau, mai bine spus, pe cineva:",
      },
      {
        type: "highlight",
        text: "un băiat blond cu ochi albaștri.",
      },
    ],
    image:
      "https://res.cloudinary.com/djzw55eub/image/upload/v1779354942/wedding/couple/couple-placeholder01_wuxuwc_vtztlw.jpg",
    date: "2021",
  },
  {
    side: "right",
    title: "Și uneori, o secundă e suficientă ca să rămână în gând o săptămână întreagă",
    offset: {
      wrapper: "md:-mt-32 lg:-mt-32 md:px-6",
      text: "md:-translate-y-32 lg:translate-y-24 xl:translate-y-32",
      image: "md:-translate-y-32 lg:translate-y-12 xl:translate-y-32",
    },
    content: [
      {
        type: "paragraph",
        text: "Au urmat zile de dezbateri, de întrebări, de „cine era el?”.",
      },
      {
        type: "paragraph",
        text: "Apoi, o decizie: nu toate poveștile trebuie lăsate în voia întâmplării.",
      },
      {
        type: "paragraph",
        text: "A început o mică „misiune”: să fie găsit băiatul blond cu ochi albaștri. ",
      },
      {
        type: "paragraph",
        text: "La o săptămână după Scara Rulantă, într-o duminică liniștită, destinul a mai făcut un pas.",
      },
      {
        type: "paragraph",
        text: "Un mesaj a ajuns la Iulian: simplu, dar încărcat de mister.",
      },
      {
        type: "paragraph",
        text: "George voia să știe cine mai fusese cu el la cinema, pentru că… o fată rămăsese cu gândul la unul dintre ei.",
      },
      {
        type: "paragraph",
        text: "Cu o ușoară ezitare, dar și cu un dram de curaj, Iulian a făcut ceea ce părea firesc — a trimis mai departe paginile prietenilor săi, ca și cum și-ar fi ascuns propria dorință printre ele.",
      },
      {
        type: "highlight",
        text: "Dar destinul nu iubește jumătățile de măsură.",
      },
      {
        type: "quote",
        text: "Îi dau și profilul tău… cine știe",
      },
      {
        type: "paragraph",
        text: "a venit răspunsul lui George — o propoziție mică, dar suficient cât să aprindă o lumină.",
      },
    ],
    image:
      "https://res.cloudinary.com/djzw55eub/image/upload/v1779354944/wedding/couple/couple-placeholder02_lb9ble_easpa9.jpg",
    date: "2024",
  },
  {
    side: "left",
    title: "Și, uneori, „cine știe” e exact începutul.",
    offset: {
      wrapper: "md:-mt-16 lg:-mt-32 md:px-6 xl:-mt-24",
      text: "md:-translate-y-24 lg:-translate-y-32 xl:translate-y-16",
      image: "md:-translate-y-24 lg:translate-y-40 xl:translate-y-44",
    },
    content: [
      {
        type: "paragraph",
        text: "Câteva momente mai târziu, un gest discret, dar plin de emoție: o cerere de follow.",
      },
      {
        type: "paragraph",
        text: "Nu era doar un click. Era o punte.",
      },
      {
        type: "paragraph",
        text: "Iulian a privit numele, a zâmbit ușor și, cu o sinceritate care nu avea nevoie de multe cuvinte, a spus:",
      },
      {
        type: "quote",
        text: "E drăguță.",
      },
      {
        type: "paragraph",
        text: "Pe 14 Februarie, la un story pe Instagram postat de Denisa cu un trandafir, a apărut primul mesaj de la Iulian.",
      },
      {
        type: "quote",
        text: "Roses are red,\nViolets are blue,\nNice to meet you!",
      },
      {
        type: "highlight",
        text: "Și de acolo, povestea a început să respire:",
      },
      {
        type: "paragraph",
        text: "printre cafele la Origo,",
      },
      {
        type: "paragraph",
        text: "plimbări în Grădina Botanică,",
      },
      {
        type: "paragraph",
        text: "ceaiuri liniștite la Infinitea",
      },
      {
        type: "paragraph",
        text: "și momente care, încet, au transformat necunoscutul în „noi”.",
      },
      {
        type: "highlight",
        text: "Pentru că uneori, dragostea nu începe cu un plan.",
      },
      {
        type: "paragraph",
        text: "Ci cu o scară rulantă, o privire și curajul de a spune…",
      },
      {
        type: "quote",
        text: "Bună.",
      },
    ],
    image:
      "https://res.cloudinary.com/djzw55eub/image/upload/v1779354946/wedding/couple/couple-placeholder03_fa7w1l_j2mr6n.jpg",
    date: "2026",
  },
  // 📍 CEREMONIE
  {
    type: "event",
    side: "right",
    title: "Ceremonia religioasa",
    offset: {
      wrapper: "md:px-6",
      text: "lg:-translate-y-16 xl:-translate-y-16",
      image: "lg:-translate-y-16 xl:-translate-y-16",
    },
    content: [
      {
        type: "paragraph",
        text: "Vom spune „DA” în fața lui Dumnezeu, într-un loc plin de liniște și binecuvântare.",
      },
      {
        type: "paragraph",
        text: "Pentru confortul tuturor invitaților și desfășurarea liniștită a ceremoniei, apreciem sosirea cu aproximativ 15 minute înainte.",
      },
    ],
    location: "Biserica „Sfinții Trei Ierarhi” Fundeni",
    date: "22 August 2026",
    time: "16:00",
    image:
      "https://res.cloudinary.com/djzw55eub/image/upload/v1779354926/wedding/event/biserica-3_ujfr6n_blig0a.jpg",
    mapLink:
      "https://www.google.com/maps/place/Parohia+Sfin%C5%A3ii+Trei+Ierarhi/@44.4619434,26.1579387,16.5z/data=!4m14!1m7!3m6!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!2sParohia+Sfin%C5%A3ii+Trei+Ierarhi!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh!3m5!1s0x40b1f8e3a6158889:0xd17402c5c5c643e5!8m2!3d44.4624468!4d26.1589631!16s%2Fg%2F1hc1cdgfh?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },

  // 🌿 PETRECERE
  {
    type: "event",
    side: "left",
    title: "Petrecerea",
    offset: {
      wrapper: "lg:-mt-2 mb-8 md:px-6",
      text: "md:-translate-y-24 lg:-translate-y-32",
      image: "lg:-translate-y-32",
    },
    content: [
      {
        type: "paragraph",
        text: "Vom sărbători iubirea noastră într-un cadru natural de poveste.",
      },
    ],
    location: "Pădurile Regale",
    date: "22 August 2026",
    time: "18:30",
    image:
      "https://res.cloudinary.com/djzw55eub/image/upload/v1779354928/wedding/event/restaurant_dog2ak_ns2qju.jpg",
    mapLink:
      "https://www.google.com/maps/place/P%C4%83durile+Regale/@44.7059572,26.3230083,14.25z/data=!4m6!3m5!1s0x40b21bab420f8689:0x6fe826cbb1c75235!8m2!3d44.7077006!4d26.3359205!16s%2Fg%2F11bw3dtk65?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
];

export const storyItems = storyData.filter((i) => i.type !== "event");
export const eventItems = storyData.filter((i) => i.type === "event");
