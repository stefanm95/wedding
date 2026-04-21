import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "break" | "peel" | "done">(
    "idle",
  );

  const ribbonControls = useAnimation();

  const handleClick = async () => {
    if (phase !== "idle") return;

    setPhase("break");

    await new Promise((r) => setTimeout(r, 120));

    await ribbonControls.start({
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    await new Promise((r) => setTimeout(r, 200));

    setPhase("peel");

    let t = 0;
    const interval = setInterval(() => {
      t += 0.02;

      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t >= 1) {
        clearInterval(interval);
        setPhase("done");

        setTimeout(() => {
          onOpen();
        }, 300);
      }
    }, 16);
  };

  return (
    <div className="hero-container" onClick={handleClick}>
      {/* TEXTURES */}
      <div className="hero-floral" />
      <div className="hero-grain" />
      <div className="hero-light" />

      {/* WEBGL */}
      {phase !== "done" && (
        <motion.div
          className="hero-canvas"
          animate={{ opacity: progress > 0.95 ? 0 : 1 }}
        >
          <PaperPeelCanvas progress={progress} />
        </motion.div>
      )}

      {/* RIBBON */}
      <motion.div
        className="hero-ribbon"
        animate={ribbonControls}
        initial={{ scaleX: 1, opacity: 1 }}
        style={{ originX: 0.5 }} // 🔥 CRITICAL (centru)
      />

      {/* WAX */}
      <motion.div
        className="hero-seal"
        initial={{ rotate: -2 }}
        animate={{ opacity: phase === "peel" ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <img alt="crest" src="/assets/crest-drop.png" className="hero-crest" />
      </motion.div>

      {/* CARD */}
      {phase !== "idle" && (
        <motion.div
          className="hero-card-reveal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: phase === "break" ? 1 : 0,
            y: phase === "break" ? -80 : 0,
            scale: 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="hero-card">
            <p className="hero-card-title">Denisa & Iuli</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
