import { forwardRef, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";

import PaperBackground from "@paper/Blocks/PaperBackground";
import PaperHeroBlock from "@paper/Blocks/PaperHeroBlock";
import PaperStoryBlock from "@paper/Blocks/PaperStoryBlock";
import PaperProgramBlock from "@paper/Blocks/PaperProgramBlock";

import { useMergedRefs } from "@hooks/useMergedRefs";
import { cn } from "@utils/cn";
import type { PaperVariant } from "@utils/paperThemes";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(({ className }, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const [variant, setVariant] = useState<PaperVariant>("day");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.3) setVariant("day");
    else if (v < 0.7) setVariant("golden");
    else setVariant("evening");
  });

  // 🎬 LIFT EFFECT
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  // 🌑 SHADOW (crește când intră)
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [
      "0px -10px 40px rgba(0,0,0,0.15)",
      "0px -20px 80px rgba(0,0,0,0.25)",
      "0px -30px 120px rgba(0,0,0,0.35)",
    ],
  );

  return (
    <motion.section
      ref={mergedRef}
      className={cn("relative z-20", className)}
      style={{
        y,
        scale,
        boxShadow: shadow,
      }}
    >
      {/* 🧻 BACKGROUND */}
      <PaperBackground variant={variant} />

      {/* 🧻 PREMIUM PAPER EDGE */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 w-full">
        {/* 🔥 contact line (FOARTE IMPORTANT) */}
        <div
          className="h-[1px] w-full"
          style={{
            background: "rgba(0,0,0,0.18)",
          }}
        />

        {/* 🌫 soft shadow (super subtil) */}
        <div
          className="h-[40px] w-full"
          style={{
            background: `
        linear-gradient(
          to bottom,
          rgba(0,0,0,0.12),
          rgba(0,0,0,0.06) 40%,
          rgba(0,0,0,0.02) 70%,
          transparent 100%
        )
      `,
          }}
        />
      </div>
      {/* 📄 CONTENT */}
      <div className="relative z-10 flex flex-col">
        <PaperHeroBlock />
        <PaperStoryBlock />
        <PaperProgramBlock />
      </div>
    </motion.section>
  );
});

export default PaperSection;
