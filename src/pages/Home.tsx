import { useRef, useState } from "react";
import { motion } from "framer-motion";

import Hero from "../sections/Hero/Hero";
import Story from "../sections/PaperSection/Story/Story";
import Timeline from "../sections/PaperSection/Timeline/Timeline";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Countdown from "../sections/PaperSection/Countdown/Countdown";
import SectionTransition from "../components/SectionTransition";
import Questionnaire from "../sections/Questionnaire/Questionnaire";
import PaperSection from "../sections/PaperSection/PaperSection";
import { useCountdown } from "../hooks/useCountdown";
import PolaroidCard from "../components/PolaroidCard";

function Home() {
  const [opened, setOpened] = useState(false);

  const heroRef = useRef(null);
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <div>
      {/* HERO NORMAL */}
      <div ref={heroRef} className="relative z-0 min-h-screen">
        <Hero opened={opened} setOpened={setOpened} heroRef={heroRef} />
      </div>

      {/* PAPER SECTION care intră peste */}
      <div className="relative z-10">
      <PaperSection>
        {/* POLAROID */}
        <div className="relative -mt-24 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 80, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <PolaroidCard />
          </motion.div>
        </div>

        <Countdown {...time} />
        <Story />
        <Timeline />
      </PaperSection>
      </div>

      <SectionTransition from="light" to="dark" />
      <Details />
      <SectionTransition from="dark" to="light" />
      <RSVP />
      <Questionnaire />
    </div>
  );
}

export default Home;