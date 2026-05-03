import { motion, useScroll, useSpring } from "framer-motion";
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

  return (
    <div className="pointer-events-none fixed right-6 top-0 z-[999] flex h-full w-[12px] items-center justify-center">
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
              className="pointer-events-auto h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active === s.id ? getSectionColor(s.id) : "rgba(0,0,0,0.2)",
                transform: active === s.id ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
