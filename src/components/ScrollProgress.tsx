import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { getSectionColor } from "@/utils/sectionThemes";

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

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.3,
  });

  const [active, setActive] = useState("hero");

  // 🔥 more stable section detection
  useEffect(() => {
    const handleScroll = () => {
      let current = "hero";

      let closest = Infinity;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        const distance = Math.abs(rect.top);

        if (distance < closest && rect.top <= window.innerHeight * 0.6) {
          closest = distance;
          current = section.id;
        }
      });

      setActive(current);
    };

    handleScroll(); // run once

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY;

    // 🎯 small offset for better alignment
    window.scrollTo({
      top: y - 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-[999] flex h-full w-[12px] items-center justify-center">
      {/* rail */}
      <div className="relative h-[72%] w-[2px] overflow-hidden rounded-full bg-black/10">
        {/* progress */}
        <motion.div
          style={{
            scaleY: smooth,
            backgroundColor: getSectionColor(active),
          }}
          className="absolute inset-0 origin-top"
        />

        {/* markers */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-300 ease-out ${
                active === s.id ? "scale-125 bg-[#6b1f2b]" : "bg-black/20 hover:bg-black/40"
              } `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
