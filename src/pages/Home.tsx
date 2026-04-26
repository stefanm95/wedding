import { useRef, useState } from "react";

import Hero from "../sections/Hero/Hero";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Questionnaire from "../sections/Questionnaire/Questionnaire";
import PaperSection from "../sections/PaperSection/PaperSection";

function Home() {
  const [opened, setOpened] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const paperRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Hero
        opened={opened}
        setOpened={setOpened}
        heroRef={heroRef}
        paperRef={paperRef}
      />

      <PaperSection ref={paperRef} />

      <Details />
      <RSVP />
      <Questionnaire />
    </>
  );
}

export default Home;
