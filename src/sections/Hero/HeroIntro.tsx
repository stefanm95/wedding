import { useState } from "react";
import { motion } from "framer-motion";
import PaperPeelCanvas from "./PaperPeelCanvas";
import { getImpact } from "../../utils/animation";

type Props = {
  onOpen: () => void;
  progress: number;
  setProgress: (v: number) => void;
};

export default function HeroIntro({ onOpen, progress, setProgress }: Props) {
  const [started, setStarted] = useState(false);

  function cinematicEase(t: number) {
    // clamp safety
    if (t <= 0) return 0;

    // 🎯 Phase split
    const holdEnd = 0.15; // slow intro
    const accelEnd = 0.75; // main motion
    const overshootEnd = 1.05; // slight push beyond 1

    // 🧊 1. HOLD (barely moves)
    if (t < holdEnd) {
      const p = t / holdEnd;
      return p * p * 0.05; // very subtle movement
    }

    // 🚀 2. ACCELERATION (cubic out)
    if (t < accelEnd) {
      const p = (t - holdEnd) / (accelEnd - holdEnd);
      const eased = 1 - Math.pow(1 - p, 3);
      return 0.05 + eased * 0.85;
    }

    // 💥 3. OVERSHOOT (go past 1)
    if (t < overshootEnd) {
      const p = (t - accelEnd) / (overshootEnd - accelEnd);
      return 0.9 + Math.sin(p * Math.PI * 0.5) * 0.25;
    }

    // 🪶 4. SETTLE (ease back to 1)
    const p = (t - overshootEnd) / (1.2 - overshootEnd);
    const settle = 1 + (1 - p) * 0.05; // slight bounce back
    return Math.min(settle, 1.2);
  }

  const handleClick = () => {
    if (started) return;

    setStarted(true);

    let rafId: number;
    const duration = 1200; // total animation time in ms (≈ your 1.2)
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const rawT = elapsed / duration; // 0 → ~1.2 range

      const eased = cinematicEase(rawT);
      setProgress(eased);

      if (rawT < 1.2) {
        rafId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(rafId);

        setTimeout(() => {
          onOpen();
        }, 200); // keep your lock → reveal timing
      }
    };

    rafId = requestAnimationFrame(animate);
  };

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
  const rawImpact = getImpact(progress);
  const impact = rawImpact * 0.35;

  return (
    <div
      onClick={handleClick}
      className='absolute inset-0 z-20 cursor-pointer'
      style={{
        pointerEvents: started ? "none" : "auto",
        position: "absolute",
      }}
    >
      {/* 🎬 peel UI */}
      <motion.div className='absolute inset-0 z-[2]' style={{ opacity }}>
        <PaperPeelCanvas
          crestProgress={crestProgress}
          peelProgress={peelProgress}
        />
      </motion.div>

      {/* 💡 impact (LOCK MOMENT REAL) */}
      <motion.div
        className='absolute inset-0 pointer-events-none z-[3]'
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
