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

    await new Promise((r) => setTimeout(r, 180));

    await ribbonControls.start({
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    });

    await new Promise((r) => setTimeout(r, 220));

    setPhase("peel");

    let t = 0;
    const interval = setInterval(() => {
      t += 0.018;

      const eased = t < 0.4 ? t * t : 1 - Math.pow(1 - t, 2);
      setProgress(eased);

      if (t >= 1) {
        clearInterval(interval);
        setPhase("done");

        setTimeout(() => {
          onOpen();
        }, 600);
      }
    }, 16);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="absolute inset-0 z-20 overflow-hidden cursor-pointer"
      style={{
        backgroundImage: `
          linear-gradient(rgba(20, 25, 18, 0.55), rgba(20, 25, 18, 0.65)),
          radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(0,0,0,0.15), transparent 60%),
          url('/assets/paperboard-texture.jpg')
        `,
        backgroundSize: "1900px auto",
        backgroundRepeat: "repeat",
        backgroundPosition: "0 0",
      }}
      initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* 🌿 FLORAL */}
      <motion.div
        className="absolute inset-0 z-[1] bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/floral-bujori-verde.png')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* 🌫 MIST LAYER */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18), transparent 60%),
            linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3))
          `,
          mixBlendMode: "soft-light",
        }}
      />

      {/* 🌫 GRAIN (UNIFIER) */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      {/* 💡 LIGHT FOCUS */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.35), transparent 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />

      {/* 🎬 CANVAS */}
      {phase !== "done" && (
        <motion.div
          className="absolute inset-0 z-[5]"
          animate={{ opacity: progress > 0.95 ? 0 : 1 }}
        >
          <PaperPeelCanvas progress={progress} />
        </motion.div>
      )}

      {/* 🎀 WRAPPER */}
      <div
        className="absolute left-1/2 top-1/2 z-[6]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* 🌑 SHADOW SUB RIBBON (ANCHOR FIX) */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "140vw",
            height: "200px",
            background: `
              radial-gradient(ellipse at center,
                rgba(0,0,0,0.25),
                transparent 70%
              )
            `,
            filter: "blur(20px)",
            zIndex: 0,
          }}
        />

        {/* 🎀 RIBBON */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            height: "160px",
            width: "130vw",

            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
              url('/assets/ribbon-celtic.png')
            `,
            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",

            boxShadow: `
              0 1px 2px rgba(0,0,0,0.09),
              0 6px 10px rgba(0,0,0,0.08)
            `,
          }}
          animate={ribbonControls}
        >
          {/* 🔝 TOP FOLD */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: "22%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)",
            }}
          />

          {/* 🔻 BOTTOM FOLD */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{
              height: "22%",
              background:
                "linear-gradient(to top, rgba(255,255,255,0.28), transparent)",
            }}
          />

          {/* 🌫 MICRO DEPTH */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 60%, rgba(0,0,0,0.05), transparent 60%)",
              mixBlendMode: "multiply",
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* 🔴 CREST */}
        <motion.img
          src="/assets/logo-crest/logo-crest-vintage.png"
          className="absolute object-contain"
          style={{
            top: "-60px",
            left: "45%",
            transform: "translate(-50%, -50%)",
            width: "24vw",
            maxWidth: "300px",
            minWidth: "180px",

            filter: `
              drop-shadow(0 6px 8px rgba(0,0,0,0.35))
              drop-shadow(0 14px 18px rgba(0,0,0,0.25))
            `,
          }}
          initial={{ rotate: -2 }}
          animate={{ opacity: phase === "peel" ? 0 : 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </motion.div>
  );
}