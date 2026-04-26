import { useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroIntro from "./HeroIntro";
import CinematicOverlay from "../../components/CinematicOverlay";
import type { HeroProps } from "../../types/hero";

export default function Hero({
  opened,
  setOpened,
  heroRef,
  paperRef,
}: HeroProps) {
  const [progress, setProgress] = useState(0); // 🔥 shared animation state
  const eased = Math.pow(progress, 1.4);

  return (
    <section ref={heroRef} className='relative h-screen overflow-hidden z-10'>
      {/* 🎬 SHARED VIDEO (SINGURUL VIDEO DIN APP) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        className='absolute inset-0 w-full h-full object-cover'
        style={{
          transform: `scale(${1.08 - eased * 0.08}))`,
          filter: `
            blur(${8 - eased * 8}px)
            brightness(${0.7 + eased * 0.25})
            contrast(${0.95 + eased * 0.15})
            saturate(${0.8 + eased * 0.15})
          `,
        }}
      >
        <source src='/assets/video/hero.mp4' type='video/mp4' />
      </video>

      {/* 🎭 INTRO (controlează animația) */}
      {!opened && (
        <HeroIntro
          onOpen={() => setOpened(true)}
          progress={progress}
          setProgress={setProgress}
        />
      )}

      {/* ✨ FINAL UI (text peste video) */}
      <HeroVideo opened={opened} heroRef={heroRef} paperRef={paperRef} />

      <CinematicOverlay intensity={1} />
    </section>
  );
}
