import { motion } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";
import LightProbeCanvas from "./LightProbeCanvas";
import CinematicOverlay from "../../components/CinematicOverlay";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [t, setT] = useState(0);

  const handleClick = () => {
    let time = 0;

    const interval = setInterval(() => {
      time += 0.006;
      setT(time);

      if (time >= 1.35) {
        clearInterval(interval);
        setTimeout(onOpen, 400);
      }
    }, 16);
  };

  const crestProgress = Math.min(t, 1);
  const peelProgress = crestProgress;

  const fadeStart = 1.15;

  let opacity = 1;
  if (t > fadeStart) {
    opacity = 1 - (t - fadeStart) / (1.35 - fadeStart);
  }

  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <motion.div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer overflow-hidden"
      animate={{ opacity }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* 🎬 BLURRED VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: "blur(20px) brightness(0.5)",
          transform: "scale(1.1)", // 🔥 evită margini după blur
        }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      {/* 🌑 DARK OVERLAY (depth cinematic) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "rgba(20,25,18,0.4)",
        }}
      />

      {/* 🔥 Light probe (invizibil) */}
      <LightProbeCanvas />

      {/* 🎬 Peel (ribbon + crest) */}
      <div className="absolute inset-0 z-[2]">
        <PaperPeelCanvas
          crestProgress={crestProgress}
          peelProgress={peelProgress}
        />
      </div>

      {/* 🎞 unified cinematic overlay */}
      <CinematicOverlay intensity={0.5} />

      {/* 💡 impact light (lock moment) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 60%)",
          mixBlendMode: "soft-light",
        }}
        animate={{
          opacity: t > 0.98 && t < 1.05 ? 0.35 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}