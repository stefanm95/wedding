import { useRef, useState } from "react";
import { motion } from "framer-motion";

import Hero from "../sections/Hero/Hero";
import Story from "../sections/PaperSection/Story/Story";
import Timeline from "../sections/PaperSection/Timeline/Timeline";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Countdown from "../sections/PaperSection/Countdown/Countdown";
import Questionnaire from "../sections/Questionnaire/Questionnaire";
import PaperSection from "../sections/PaperSection/PaperSection";
import { useCountdown } from "../hooks/useCountdown";
import PolaroidCard from "../components/PolaroidCard";

function Home() {
  const [opened, setOpened] = useState(false);
  const heroRef = useRef(null);
  const paperRef = useRef(null);
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <>
      <div className="relative">
        {/* 🎬 HERO FIXED BACKGROUND */}
        <div className="fixed inset-0 z-0">
          <Hero opened={opened} setOpened={setOpened} heroRef={heroRef} paperRef={paperRef} />
        </div>

        {/* 📜 SCROLL CONTENT */}
        <div ref={heroRef} className="relative z-10 pointer-events-none">
          {/* spacer = înălțimea hero */}
          <div className="h-screen" />

          <PaperSection ref={paperRef}>
            <motion.div
              initial={{ opacity: 0, y: 120, rotate: -10, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <PolaroidCard />
            </motion.div>

            <Countdown {...time} />
            <Story />
            <Timeline />
          </PaperSection>
        </div>
      </div>

      
      <Details />
      
      <RSVP />
      <Questionnaire />
    </>
  );
}

export default Home;
