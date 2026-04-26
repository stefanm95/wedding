import { forwardRef, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

import PaperBackground from "./Blocks/PaperBackground";
import PaperHeroBlock from "./Blocks/PaperHeroBlock";
import PaperStoryBlock from "./Blocks/PaperStoryBlock";
import PaperProgramBlock from "./Blocks/PaperProgramBlock";

import type { PaperVariant } from "../../utils/paperThemes";
import { useMergedRefs } from "../../hooks/useMergedRefs";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(
  ({ className }, ref) => {
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
        className={`relative z-20 ${className ?? ""}`}
        style={{
          y,
          scale,
          boxShadow: shadow,
        }}
      >
        {/* 🧻 BACKGROUND */}
        <PaperBackground variant={variant} />

        {/* 🧻 PREMIUM PAPER EDGE */}
        <div className='absolute top-0 left-0 w-full pointer-events-none z-30'>
          {/* 🔥 contact line (FOARTE IMPORTANT) */}
          <div
            className='w-full h-[1px]'
            style={{
              background: "rgba(0,0,0,0.18)",
            }}
          />

          {/* 🌫 soft shadow (super subtil) */}
          <div
            className='w-full h-[40px]'
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
        <div className='relative z-10 flex flex-col'>
          <PaperHeroBlock />
          <PaperStoryBlock />
          <PaperProgramBlock />
        </div>
      </motion.section>
    );
  },
);

export default PaperSection;
