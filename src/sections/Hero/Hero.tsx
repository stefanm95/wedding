import { useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroIntro from "./HeroIntro";
import CinematicOverlay from "../../components/CinematicOverlay";

export default function Hero({ opened, setOpened, heroRef }: any) {
  const [progress, setProgress] = useState(0); // 🔥 shared animation state
  const eased = Math.pow(progress, 1.4);

  return (
    <div className="relative z-0 min-h-screen w-full overflow-hidden bg-black">
      {/* 🎬 SHARED VIDEO (SINGURUL VIDEO DIN APP) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: `
            blur(${8 - eased * 8}px)
            brightness(${0.7 + eased * 0.25})
            contrast(${0.95 + eased * 0.15})
            saturate(${0.8 + eased * 0.15})
          `,
          transform: `scale(${1.06 - eased * 0.06})`,
        }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
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
      <HeroVideo opened={opened} heroRef={heroRef} />

      <CinematicOverlay intensity={1} />
    </div>
  );
}
