import { forwardRef, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import Countdown from "./Countdown/Countdown";
import Story from "./Story/Story";
import PolaroidCard from "./Countdown/PolaroidCard";
import PaperBackground from "./PaperBackground";
import ProgramInline from "./Program/ProgramInline";

import { useCountdown } from "../../hooks/useCountdown";
import { useMergedRefs } from "../../hooks/useMergedRefs";

import type { PaperVariant } from "../../utils/paperThemes";
import type { HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"section">;

const PaperSection = forwardRef<HTMLElement, Props>((props, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -20]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const time = useCountdown(new Date("2026-08-22T16:00:00"));
  const [variant, setVariant] = useState<PaperVariant>("day");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.3) setVariant("day");
    else if (v < 0.7) setVariant("golden");
    else setVariant("evening");
  });

  return (
    <motion.section
      ref={mergedRef}
      {...props}
      className='relative z-20 py-32 overflow-hidden'
      style={{ ...props.style, y }}
    >
      {/* 🧻 BACKGROUND */}
      <div className='absolute inset-0'>
        <PaperBackground variant={variant} />
      </div>

      {/* 📄 CONTENT */}
      <div className='relative z-30 max-w-4xl mx-auto px-6'>
        {/* POLAROID */}
        <div className='flex justify-center mb-20'>
          <PolaroidCard />
        </div>

        {/* COUNTDOWN */}
        <Countdown {...time} />

        {/* STORY */}
        <Story />

        {/* TRANSITION */}
        <div className='text-center mt-24 mb-16'>
          <p className='italic text-[#6b1f2b]/70'>
            Vă invităm să fiți alături de noi
          </p>
        </div>

        {/* PROGRAM */}
        <ProgramInline />
      </div>
    </motion.section>
  );
});

PaperSection.displayName = "PaperSection";
export default PaperSection;
