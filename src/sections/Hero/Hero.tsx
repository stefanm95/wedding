import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import CinematicOverlay from "@components/CinematicOverlay";

import type { HeroProps } from "@/types/hero";

import HeroIntro from "./HeroIntro";
import HeroVideo from "./HeroVideo";
import { useDevice } from "@/hooks/useDevice";

export default function Hero({ opened, setOpened, paperRef }: HeroProps) {
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const visibilityStateRef = useRef<"playing" | "paused">("playing");

  const { width } = useDevice();

  const isMobile = width < 768;

  const { scrollYProgress } = useScroll({
    target: paperRef,
    offset: ["start 0.85", "start 0.25"],
  });

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, isMobile ? 4 : 8]);

  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

  const filter = useMotionTemplate`
    blur(${blur}px)
    brightness(0.9)
    contrast(1.05)
    saturate(1)
  `;

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;

    if (!hero || !video || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        const ratio = entry.intersectionRatio;

        /**
         * 🎬 HYSTERESIS STABILIZATION
         *
         * Avoid rapid play/pause oscillation near threshold.
         *
         * play  -> >= 35%
         * pause -> <= 15%
         */

        if (ratio <= 0.15 && visibilityStateRef.current !== "paused") {
          video.pause();

          visibilityStateRef.current = "paused";
        }

        if (ratio >= 0.35 && visibilityStateRef.current !== "playing") {
          video.play().catch(() => {});

          visibilityStateRef.current = "playing";
        }
      },
      {
        threshold: [0, 0.15, 0.35, 0.5, 1],
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative z-0 min-h-[100dvh] overflow-hidden bg-black"
    >
      {/* ========================= */}
      {/* 🖼 FALLBACK IMAGE */}
      {/* ========================= */}

      <motion.img
        src="/assets/video-placeholder.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        animate={{
          opacity: videoLoaded ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      />

      {/* ========================= */}
      {/* 🎬 VIDEO */}
      {/* ========================= */}

      <motion.div
        className="absolute inset-0"
        style={{
          scale: scaleScroll,
        }}
      >
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlayThrough={() => setVideoLoaded(true)}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            filter,

            /**
             * Avoid excessive compositing pressure on mobile.
             */
            willChange: isMobile ? "transform" : "filter, transform",

            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <source
            src={isMobile ? "/assets/video/video-mobile.mp4" : "/assets/video/video-web.mp4"}
            type="video/mp4"
          />
        </motion.video>
      </motion.div>

      {/* ========================= */}
      {/* 🎨 ATMOSPHERIC OVERLAYS */}
      {/* ========================= */}

      <div className="pointer-events-none absolute inset-0 bg-[#6b1f2b]/20 mix-blend-multiply" />

      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {/* ========================= */}
      {/* 🎬 HERO CONTENT */}
      {/* ========================= */}

      <HeroVideo opened={opened} paperRef={paperRef} />

      <CinematicOverlay intensity={opened ? 0 : 1} />

      {/* ========================= */}
      {/* ✨ INTRO OVERLAY */}
      {/* ========================= */}

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
