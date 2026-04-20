import Hero from "../components/Hero/Hero";
import Story from "../components/Story/Story";
import Timeline from "../components/Timeline/Timeline";
import Details from "../components/Details/Details";
import RSVP from "../components/RSVP/RSVP";
import Countdown from "../components/Countdown/Countdown";
import SectionTransition from "../components/Transition/SectionTransition";
import Questionnaire from "../components/Questionnaire/Questionnaire";

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
