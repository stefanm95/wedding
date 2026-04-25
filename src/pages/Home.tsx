import { useRef, useState } from "react";
import Hero from "../sections/Hero/Hero";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Questionnaire from "../sections/Questionnaire/Questionnaire";
import PaperSection from "../sections/PaperSection/PaperSection";
import ProgramSection from "../sections/Program/ProgramSection";

function Home() {
  const [opened, setOpened] = useState(false);

  const heroRef = useRef(null);
  const paperRef = useRef(null);

  return (
    <>
      <div className='relative'>
        {/* HERO */}
        <div className='fixed inset-0 z-0'>
          <Hero
            opened={opened}
            setOpened={setOpened}
            heroRef={heroRef}
            paperRef={paperRef}
          />
        </div>

        {/* FLOW */}
        <div ref={heroRef} className='relative z-10 pointer-events-none'>
          <div className='h-screen' />

          <PaperSection ref={paperRef} />
        </div>
      </div>
      <ProgramSection />

      <Details />
      <RSVP />
      <Questionnaire />
    </>
  );
}

export default Home;
