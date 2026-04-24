import { forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import Countdown from "./Countdown/Countdown";
import Story from "./Story/Story";
import Timeline from "./Timeline/Timeline";
import PolaroidCard from "../../components/PolaroidCard";
import { useCountdown } from "../../hooks/useCountdown";
import PaperBackground from "./PaperBackground";

type Props = HTMLMotionProps<"section">;

const PaperSection = forwardRef<HTMLElement, Props>((props, ref) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -40]);

  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <motion.section
      ref={ref}
      {...props}
      className='relative z-20 min-h-screen py-32 px-6 overflow-hidden'
      style={{ ...props.style, y }}
    >
      {/* 🎨 BACKGROUND */}
      <PaperBackground />

      {/* 🎬 CONTENT */}
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
        <Timeline />
      </div>
    </motion.section>
  );
});

PaperSection.displayName = "PaperSection";

export default PaperSection;
