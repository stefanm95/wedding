import { useState } from "react";
import { motion } from "framer-motion";
import PaperPeelCanvas from "./PaperPeelCanvas";
import LightProbeCanvas from "./LightProbeCanvas";

type Props = {
  onOpen: () => void;
  progress: number;
  setProgress: (v: number) => void;
};

export default function HeroIntro({ onOpen, progress, setProgress }: Props) {
  const [started, setStarted] = useState(false);

  const handleClick = () => {
    if (started) return;

    setStarted(true);

    let time = 0;

    const interval = setInterval(() => {
      time += 0.006;

      // 🔥 NU mai limităm la 1 — avem nevoie de zona de lock
      setProgress(time);

      if (time >= 1.2) {
        clearInterval(interval);

        setTimeout(() => {
          onOpen();
        }, 200); // 🔥 mai rapid după lock
      }
    }, 16);
  };

  // 🎯 PHASES
  const lockStart = 0.92;
  const lockEnd = 1.05;
  const fadeStart = 1.08;
  const fadeEnd = 1.2;

  const crestProgress = Math.min(progress, 1); // crest rămâne 0–1
  const peelProgress = Math.min(progress, 1); // ribbon la fel

  // 🔥 FADE DOAR DUPĂ LOCK
  const opacity =
    progress < fadeStart
      ? 1
      : Math.max(0, 1 - (progress - fadeStart) / (fadeEnd - fadeStart));

  // 🔥 IMPACT LIGHT (lock window)
  const impact =
    progress > lockStart && progress < lockEnd
      ? Math.sin(((progress - lockStart) / (lockEnd - lockStart)) * Math.PI) *
        0.35
      : 0;

  return (
    <div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer"
      style={{
        pointerEvents: started ? "none" : "auto",
      }}
    >
      {/* 🔥 light probe */}
      <LightProbeCanvas />

      {/* 🎬 peel UI */}
      <motion.div className="absolute inset-0 z-[2]" style={{ opacity }}>
        <PaperPeelCanvas
          crestProgress={crestProgress}
          peelProgress={peelProgress}
        />
      </motion.div>

      {/* 💡 impact (LOCK MOMENT REAL) */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 60%)",
          mixBlendMode: "soft-light",
          opacity: impact,
        }}
      />
    </div>
  );
}
