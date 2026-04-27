import { useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

import HeroVideo from "./HeroVideo";
import HeroIntro from "./HeroIntro";

import CinematicOverlay from "../../components/CinematicOverlay";

import type { HeroProps } from "../../types/hero";

export default function Hero({ opened, setOpened, paperRef }: HeroProps) {
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: paperRef,
    offset: ["start end", "start start"],
  });

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 12]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const filter = useMotionTemplate`
  blur(${blur}px)
  brightness(0.9)
  contrast(1.05)
  saturate(1)
`;

  return (
    <section className="relative z-0 h-screen overflow-hidden">
      {/* 🎬 VIDEO */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: scaleScroll,
        }}
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            filter,
            willChange: "filter, transform",
          }}
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* 🔥 IMPORTANT: elimină linia gri */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* ✨ TEXT + SCROLL */}
      <HeroVideo opened={opened} paperRef={paperRef} />

      <CinematicOverlay intensity={1} />

      {/* 🎭 INTRO */}
      {!opened && (
        <HeroIntro onOpen={() => setOpened(true)} progress={progress} setProgress={setProgress} />
      )}
    </section>
  );
}
