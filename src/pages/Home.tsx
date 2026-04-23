import Hero from "../sections/Hero/Hero";
import Story from "../sections/Countdown/Story/Story";
import Timeline from "../sections/Timeline/Timeline";
import Details from "../sections/Details/Details";
import RSVP from "../sections/RSVP/RSVP";
import Countdown from "../sections/Countdown/Countdown";
import SectionTransition from "../components/Transition/SectionTransition";
import Questionnaire from "../sections/Questionnaire/Questionnaire";

function Home() {
  return (
    <>
      {/* HERO — dark cinematic entry */}
      <div className="relative min-h-screen w-full overflow-hidden bg-primary">
        <Hero />
      </div>
      {/* COUNTDOWN — still dark, keep immersion */}
      <Countdown />

      {/* TRANSITION → move into light emotional space */}
      <SectionTransition from="dark" to="light" />

      {/* STORY — beige, intimate */}
      <Story />

      {/* TIMELINE — same tone, no break */}
      <Timeline />

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
