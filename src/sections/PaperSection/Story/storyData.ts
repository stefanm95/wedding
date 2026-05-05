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
    text: "cu o invitație simplă, aproape banală, între două prietene: „Hai la film!”, iar uneori cele mai mici gesturi deschid cele mai mari povești. Într-o zi în care gândurile Denisei aveau nevoie de o pauză de la paginile de învățat, a înflorit dorința de a evada într-un film. Miruna, ca un mesager al întâmplării, i-a propus cinematograful din Plazza Mall și filmul Puss in Boots. În același timp, pe un fir paralel al destinului, dorința lui Iulian nu îi aparținea lui, ci prietenului său Dorico, care dorea să revadă un film vechi, premiat, revenit pe marile ecrane în același cinematograf. Două filme. Două începuturi. Un singur loc. Când filmul Denisei se terminase, iar al lui Iulian abia urma să înceapă, drumurile lor s-au intersectat pentru prima dată - nu într-un cadru grandios, ci pe o scară rulantă, undeva între „început” și „pentru totdeauna”. Ea cobora. El urca. În timp ce secundele pe scara rulantă se scurgeau, Iulian i-a recunoscut pe Miruna și iubitul ei George, iar Denisa… Denisa a observat altceva. Sau, mai bine spus, pe cineva, un băiat blond cu ochi albaștri.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder01_wuxuwc.jpg",
    date: "2021",
  },
  {
    side: "right",
    title: "Și uneori, o secundă e suficientă ca să rămână în gând o săptămână întreagă",
    text: "Au urmat zile de dezbateri, de întrebări, de „cine era el?”. Apoi, o decizie: nu toate poveștile trebuie lăsate în voia întâmplării.A început o mică „misiune”: să fie găsit băiatul blond cu ochi albaștri.La o săptămână după Scara Rulantă, într-o duminică liniștită, destinul a mai făcut un pas.Un mesaj a ajuns la Iulian: simplu, dar încărcat de mister. George voia să știe cine mai fusese cu el la cinema, pentru că… o fată rămăsese cu gândul la unul dintre ei.Cu o ușoară ezitare, dar și cu un dram de curaj, Iulian a făcut ceea ce părea firesc — a trimis mai departe paginile prietenilor săi, ca și cum și-ar fi ascuns propria dorință printre ele.Dar destinul nu iubește jumătățile de măsură.„Îi dau și profilul tău… cine știe”, a venit răspunsul lui George o propoziție mică, dar suficient cât să aprindă o lumină.",
    image:
      "https://res.cloudinary.com/dswwhzem5/image/upload/v1777520563/couple-placeholder02_lb9ble.jpg",
    date: "2024",
  },
  {
    side: "left",
    title: "Și, uneori, „cine știe” e exact începutul.",
    text: "Câteva momente mai târziu, un gest discret, dar plin de emoție: o cerere de follow. Nu era doar un click. Era o punte. Iulian a privit numele, a zâmbit ușor și, cu o sinceritate care nu avea nevoie de multe cuvinte, a spus: „E drăguță.” Pe 14 Februarie, la un story pe Instagram postat de Denisa cu un trandafir a apărut primul mesaj de la Iulian.„Roses are red, Violets are blueNice to meet you!”Și de acolo, povestea a început să respire:printre cafele la Origo,plimbări în Grădina Botanică,ceaiuri liniștite la Infiniteași momente care, încet, au transformat necunoscutul în „noi”.Pentru că uneori, dragostea nu începe cu un plan.Ci cu o scară rulantă, o privire și curajul de a spune… „Bună.”",
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
