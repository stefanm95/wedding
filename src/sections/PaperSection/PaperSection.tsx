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
      {/* 🧾 STACKED PAPER WRAPPER */}
      <div className='relative z-10 flex justify-center'>
        <div className='relative w-full'>
          {/* 🧾 BACK PAPER */}
          <div
            className='
              absolute inset-0
              translate-x-3 translate-y-3
              rounded-[6px]
              bg-[#eae4d8]
              shadow-[0_25px_60px_rgba(0,0,0,0.25)]
            '
            style={{ transform: "rotate(0.8deg)" }}
          />

          {/* 🧻 FRONT PAPER */}
          <div
            className='
              relative
              rounded-[6px]
              overflow-hidden
              bg-[#f4f1ea]
              shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            '
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {/* 🎨 PAPER BACKGROUND */}
            <div className='absolute inset-0'>
              <PaperBackground variant={variant} />
            </div>

            {/* ✂️ TORN EDGE */}
            <div className='absolute top-0 left-0 w-full h-20 pointer-events-none z-20'>
              <svg
                viewBox='0 0 1440 120'
                preserveAspectRatio='none'
                className='w-full h-full'
              >
                <path
                  d='
                    M0,40
                    C120,60 240,20 360,40
                    C480,60 600,20 720,40
                    C840,60 960,20 1080,40
                    C1200,60 1320,20 1440,40
                    L1440,0
                    L0,0
                    Z
                  '
                  fill='#f4f1ea'
                />
              </svg>
            </div>

            {/* 🌫 SHADOW SUB EDGE */}
            <div
              className='absolute top-0 left-0 w-full h-24 pointer-events-none z-10'
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
                opacity: 0.25,
              }}
            />

            {/* 📄 CONTENT */}
            <div className='relative z-30 px-6 py-24'>
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
          </div>
        </div>
      </div>
    </motion.section>
  );
});

PaperSection.displayName = "PaperSection";

export default PaperSection;
