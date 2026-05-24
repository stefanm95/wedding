import { useDevice } from "@/hooks/useDevice";
import { useEffect, useRef, useState } from "react";

import FloatingNav from "@/components/FloatingNav";
import ScrollProgress from "@/components/ScrollProgress";
import PaperSection from "@paper/PaperSection";
import Hero from "@sections/Hero/Hero";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "paper-hero", label: "Invitație" },
  { id: "story", label: "Poveste" },
  // { id: "program", label: "Program" },
  { id: "details", label: "DETALII" },
  { id: "rsvp", label: "Confirmare" },
];

function Home() {
  const [opened, setOpened] = useState(false);
  const paperRef = useRef<HTMLElement | null>(null);

  const { isMobile, isTablet } = useDevice();
  const isCompact = isMobile || isTablet;

  // 🔒 lock scroll until intro is opened
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.style.overflow = opened ? "" : "hidden";
    }, 50);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [opened]);

  // 🔄 always start from top
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  // 🚫 disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="relative">
      {/* 🧭 DESKTOP ONLY NAV */}
      {!isCompact && <FloatingNav sections={sections} />}

      {/* 📊 SCROLL PROGRESS (all devices) */}
      <div className={`transition-opacity duration-700 ${opened ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgress sections={sections} />
      </div>

      {/* 🎬 HERO (fixed background) */}
      <div className="fixed inset-0 z-0">
        <Hero opened={opened} setOpened={setOpened} paperRef={paperRef} />
      </div>

      {/* 📄 CONTENT FLOW */}
      <div className="content-flow pointer-events-none relative z-20 -mt-[40vh]">
        {/* spacer */}
        <div className="h-screen" />

        {/* paper */}
        <PaperSection ref={paperRef} opened={opened} className="pointer-events-auto" />
      </div>
    </div>
  );
}

export default Home;
