import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

import HeroIntro from "./HeroIntro";
import HeroVideo from "./HeroVideo";

import CinematicOverlay from "@components/CinematicOverlay";

import type { HeroProps } from "@/types/hero";

export default function Hero({ opened, setOpened, paperRef }: HeroProps) {
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: paperRef,
    offset: ["start 0.85", "start 0.25"],
  });

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 12]);
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

  const filter = useMotionTemplate`
  blur(${blur}px)
  brightness(0.9)
  contrast(1.05)
  saturate(1)
`;

  return (
    <section id="hero" className="relative z-0 h-screen overflow-hidden">
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
          <source src="/assets/video.hero_maxclim.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[#6b1f2b]/20 mix-blend-multiply" />

      {/* 🔥 IMPORTANT: elimină linia gri */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* ✨ TEXT + SCROLL */}
      <HeroVideo opened={opened} paperRef={paperRef} />

      <CinematicOverlay intensity={opened ? 0 : 1} />

      {/* 🎭 INTRO */}
      <motion.div
        className="absolute inset-0 z-[999]"
        animate={{
          y: opened ? "-100%" : "0%",
        }}
        transition={{
          duration: 1.2,
          ease: [0.65, 0, 0.35, 1],
        }}
        style={{
          pointerEvents: opened ? "none" : "auto",
        }}
      >
        <HeroIntro onOpen={() => setOpened(true)} progress={progress} setProgress={setProgress} />
      </motion.div>
    </section>
  );
}
