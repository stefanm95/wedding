import { useState } from "react";
import HeroVideo from "./HeroVideo";
import HeroIntro from "./HeroIntro";
import CinematicOverlay from "../../components/CinematicOverlay";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0); // 🔥 shared animation state
  const eased = Math.pow(progress, 1.4);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
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
            brightness(${0.75 + eased * 0.2})
            contrast(${0.9 + eased * 0.1})
            saturate(${0.85 + eased * 0.1})
          `,
          transform: `scale(${1.05 - eased * 0.05})`,
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
      <HeroVideo opened={opened} />

      <CinematicOverlay intensity={1} />
    </div>
  );
}
