import Hero from "../sections/Hero/Hero";
import Story from "../sections/PaperSection/Story/Story";
import Timeline from "../sections/PaperSection/Timeline/Timeline";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Countdown from "../sections/PaperSection/Countdown/Countdown";
import SectionTransition from "../components/Transition/SectionTransition";
import Questionnaire from "../sections/Questionnaire/Questionnaire";
import PaperSection from "../sections/PaperSection/PaperSection";
import { useCountdown } from "../hooks/useCountdown";


function Home() {
  const time = useCountdown(new Date("2026-08-20T00:00:00"));
  return (
    <>
      {/* HERO — dark cinematic entry */}
      <div className="relative min-h-screen w-full overflow-hidden bg-primary">
        <Hero />
      </div>

      <PaperSection>
        <Countdown {...time} />
        <Story />
        <Timeline />
      </PaperSection>

      {/* TRANSITION → back to dark for contrast */}
      <SectionTransition from="light" to="dark" />

      {/* DETAILS — minimal, grounded */}
      <Details />

      {/* TRANSITION → back to light for UX */}
      <SectionTransition from="dark" to="light" />

      {/* RSVP — important interaction, keep it clean */}
      <RSVP />

      {/* QUESTIONNAIRE — continuation, no break */}
      <Questionnaire />
    </>
  );
}

export default Home;
