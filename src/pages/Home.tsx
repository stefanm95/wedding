import { useEffect, useRef, useState } from "react";

import Hero from "@sections/Hero/Hero";
import PaperSection from "@paper/PaperSection";
import FloatingNav from "@/components/FloatingNav";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "hero-block", label: "Intro" },
  { id: "story", label: "Poveste" },
  { id: "program", label: "Program" },
  { id: "rsvp", label: "RSVP" },
];

function Home() {
  const [opened, setOpened] = useState(false);
  const paperRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef(null);
  const programRef = useRef(null);
  const rsvpRef = useRef(null);
  const hasSnapped = useRef(false);

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
  // 🧲 SNAP SCROLL (optional, can be removed if you prefer free scroll)
  // useEffect(() => {
  //   let ticking = false;

  //   const handleScroll = () => {
  //     if (ticking) return;

  //     requestAnimationFrame(() => {
  //       const y = window.scrollY;
  //       const vh = window.innerHeight;

  //       const triggerStart = vh * 0.3;
  //       const triggerEnd = vh * 0.7;

  //       // 🧲 SNAP (only once)
  //       if (!hasSnapped.current && y > triggerStart && y < triggerEnd) {
  //         hasSnapped.current = true;

  //         window.scrollTo({
  //           top: vh,
  //           behavior: "smooth",
  //         });
  //       }

  //       // 🔄 RESET when user goes back up
  //       if (y < triggerStart * 0.5) {
  //         hasSnapped.current = false;
  //       }

  //       ticking = false;
  //     });

  //     ticking = true;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="relative">
      <FloatingNav sections={sections} />
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
