import { useEffect, useRef, useState } from "react";

import Hero from "@sections/Hero/Hero";
import PaperSection from "@paper/PaperSection";
import FloatingNav from "@/components/FloatingNav";
import ScrollProgress from "@/components/ScrollProgress";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "paper-hero", label: "Invitație" },
  { id: "story", label: "Poveste" },
  { id: "program", label: "Program" },
  { id: "rsvp", label: "RSVP" },
];

function Home() {
  const [opened, setOpened] = useState(false);
  const paperRef = useRef<HTMLElement | null>(null);

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

  //       const triggerStart = vh * 0.35;
  //       const triggerEnd = vh * 0.75;

  //       if (!hasSnapped.current && y > triggerStart && y < triggerEnd) {
  //         hasSnapped.current = true;

  //         window.scrollTo({
  //           top: vh,
  //           behavior: "smooth",
  //         });
  //       }

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
      <div className={`transition-opacity duration-700 ${opened ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgress />
      </div>
      {/* 🎬 HERO (BACKGROUND GLOBAL) */}
      <div className="fixed inset-0 z-0">
        <Hero opened={opened} setOpened={setOpened} paperRef={paperRef} />
      </div>

      {/* 📄 CONTENT FLOW */}
      <div className="content-flow pointer-events-none relative z-20 -mt-[40vh]">
        {/* spacer = înălțimea hero */}
        <div className="h-screen" />

        {/* PAPER vine peste */}
        <PaperSection ref={paperRef} opened={opened} className="pointer-events-auto" />
      </div>
    </div>
  );
}

export default Home;
