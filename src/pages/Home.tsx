import { useRef, useState } from "react";

import Hero from "../sections/Hero/Hero";
import PaperSection from "../sections/PaperSection/PaperSection";

function Home() {
  const [opened, setOpened] = useState(false);
  const paperRef = useRef<HTMLElement | null>(null);

  return (
    <div className='relative'>
      {/* 🎬 HERO (BACKGROUND GLOBAL) */}
      <div className='fixed inset-0 z-0'>
        <Hero opened={opened} setOpened={setOpened} paperRef={paperRef} />
      </div>

      {/* 📄 CONTENT FLOW */}
      <div className='relative z-10 pointer-events-none'>
        {/* spacer = înălțimea hero */}
        <div className='h-screen' />

        {/* PAPER vine peste */}
        <PaperSection ref={paperRef} className='pointerevents-auto' />
      </div>
    </div>
  );
}

export default Home;
