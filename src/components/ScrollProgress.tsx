import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "framer-motion";

import { useScrollSystem, type Section } from "@/hooks/useScrollSystem";
import { getSectionColor } from "@/utils/sectionThemes";

type Props = {
  sections: Section[];
};

export default function ScrollProgress({ sections }: Props) {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.3,
  });

  const { active, scrollTo } = useScrollSystem(sections);

  // 🎨 base colors
  const c1 = getSectionColor("paper-hero");
  const c2 = getSectionColor("story");
  const c3 = getSectionColor("program");
  const c4 = getSectionColor("rsvp");

  // 🔥 interpolate color through scroll
  const liquidColor = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [c1, c2, c3, c4]);

  // 🧪 optional: second tone for richer gradient
  const liquidColorSoft = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [c2, c3, c4, c4]);

  // 🌊 liquid gradient
  const gradient = useMotionTemplate`
    linear-gradient(
      to bottom,
      ${liquidColor} 0%,
      ${liquidColorSoft} 100%
    )
  `;

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-[999] flex h-full w-[12px] items-center justify-center">
      <div className="relative h-[72%] w-[2px] overflow-hidden rounded-full bg-black/10 opacity-80">
        {/* 🌊 LIQUID PROGRESS */}
        <motion.div
          style={{
            scaleY: smooth,
            background: gradient,
          }}
          className="absolute inset-0 origin-top"
        />

        {/* markers */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {sections.map((s) => {
            const isActive = active === s.id;
            const color = getSectionColor(s.id);

            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group pointer-events-auto relative flex h-4 w-4 items-center justify-center"
              >
                {/* subtle ring (structure anchor) */}
                <span
                  className="absolute h-3 w-3 rounded-full border transition-all duration-500"
                  style={{
                    borderColor: isActive ? color : "rgba(0,0,0,0.15)",
                    opacity: isActive ? 0.6 : 0.3,
                  }}
                />

                {/* inner dot */}
                <span
                  className="relative z-10 h-[6px] w-[6px] rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: color,
                    opacity: isActive ? 1 : 0.4,
                    transform: isActive ? "scale(1.2)" : "scale(0.9)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
