import { useEffect, useRef, useState } from "react";

import Hero from "@sections/Hero/Hero";
import PaperSection from "@paper/PaperSection";

function Home() {
  const [opened, setOpened] = useState(false);
  const paperRef = useRef<HTMLElement | null>(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!opened) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }, 50); // small delay allows scroll reset

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => {
    // force immediately
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // and again next frame (important)
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="relative">
      {/* 🎬 HERO (BACKGROUND GLOBAL) */}
      <div className="fixed inset-0 z-0">
        <Hero opened={opened} setOpened={setOpened} paperRef={paperRef} />
      </div>

      {/* 📄 CONTENT FLOW */}
      <div className="pointer-events-none relative z-20 -mt-[40vh]">
        {/* spacer = înălțimea hero */}
        <div className="h-screen" />

        {/* PAPER vine peste */}
        <PaperSection ref={paperRef} opened={opened} className="pointer-events-auto" />
      </div>
    </div>
  );
}

export default Home;
