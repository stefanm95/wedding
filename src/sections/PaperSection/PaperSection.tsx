import { forwardRef, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import Countdown from "./Countdown/Countdown";
import Story from "./Story/Story";
import PolaroidCard from "../../components/PolaroidCard";
import PaperBackground from "./PaperBackground";

import { useCountdown } from "../../hooks/useCountdown";
import { useMergedRefs } from "../../hooks/useMergedRefs";

import type { PaperVariant } from "../../utils/paperThemes";
import type { HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"section">;

const PaperSection = forwardRef<HTMLElement, Props>((props, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -40]);

  // 🔥 IMPORTANT: scroll legat de secțiune
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
      className='relative z-20 min-h-screen py-32 px-6 overflow-hidden'
      style={{ ...props.style, y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <PaperBackground variant={variant} />

      <div className='relative z-10 max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 120, rotate: -10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='flex justify-center mb-24'
        >
          <PolaroidCard />
        </motion.div>

        <Countdown {...time} />
        <Story />
      </div>
    </motion.section>
  );
});

PaperSection.displayName = "PaperSection";

export default PaperSection;
