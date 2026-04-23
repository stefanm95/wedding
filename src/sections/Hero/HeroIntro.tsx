import { motion } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [t, setT] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
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

  // 🎯 CORE
  const crestProgress = Math.min(t, 1);

  const peelStart = 0;
  const peelProgress =
    crestProgress < peelStart
      ? 0
      : (crestProgress - peelStart) / (1 - peelStart);

  // 🔒 LOCK PHASE (IMPORTANT)
  const lockStart = 1;
  const fadeStart = 1.15;

  // 💡 FADE DOAR DUPĂ LOCK
  let opacity = 1;

  if (t > fadeStart) {
    opacity = 1 - (t - fadeStart) / (1.35 - fadeStart);
  }

  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <motion.div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer"
      animate={{ opacity }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        backgroundImage: `
          linear-gradient(rgba(20,25,18,0.7), rgba(20,25,18,0.8)),
          url('/assets/paperboard-texture.jpg')
        `,
      }}
    >
      {/* 🔥 LIGHT IMPACT DOAR LA LOCK */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
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

      <PaperPeelCanvas
        crestProgress={crestProgress}
        peelProgress={Math.min(peelProgress, 1)}
      />
    </motion.div>
  );
}