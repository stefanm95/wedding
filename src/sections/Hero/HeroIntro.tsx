import { useState } from "react";
import { motion } from "framer-motion";
import PaperPeelCanvas from "./PaperPeelCanvas";
import { getImpact } from "../../utils/animation";
import { cinematicEase } from "../../utils/cinematic-ease";

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
