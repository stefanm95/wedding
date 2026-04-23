import { motion } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [progress, setProgress] = useState(0); //crest
  const [peelProgress, setPeelProgress] = useState(0); // ribbon
  const [phase, setPhase] = useState<"idle" | "animating" | "done">(
    "idle",
  );

  const handleClick = () => {
    if (phase !== "idle") return;

    setPhase("animating");

    let t = 0;

    const interval = setInterval(() => {
      t += 0.01;

      // 🎯 crest progression
      const crest = Math.min(t, 1);
      setProgress(crest);

      const rotation = crest * 90; // 🔥 control clar

      // 🔥 TRIGGER: când ajunge la ~90deg
      // 🔥 începe mai devreme
      const peelStart = 50; // grad
      const peelEnd = 110; // grad virtual (continuăm după 90)

      if (rotation > peelStart) {
        const peelT = (rotation - peelStart) / (peelEnd - peelStart);
        setPeelProgress(Math.min(peelT, 1));
      }

      if (t >= 1.3) {
        clearInterval(interval);
        setPhase("done");

        setTimeout(onOpen, 600);
      }
    }, 16);
  };

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(20, 25, 18, 0.65), rgba(20, 25, 18, 0.75)),
          url('/assets/paperboard-texture.jpg')
        `,
        backgroundSize: "1900px auto",
        backgroundRepeat: "repeat",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 🎬 PEEL */}
      <PaperPeelCanvas progress={peelProgress} />

      {/* 🎀 WRAPPER */}
      <div className="absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2">
        {/* 🎀 RIBBON (STATIC, cu decupaj crest) */}
        <div
          className="relative w-[130vw] h-[160px]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.25)),
              url('/assets/ribbon/ribbon-vintage.png')
            `,
            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",

            filter: `
              saturate(0.9)
              brightness(0.9)
              contrast(1.05)
            `,

            mixBlendMode: "multiply",
          }}
        />

        {/* 🔴 CREST */}
        <motion.img
          src="/assets/crest/logo-crest-vintage.png"
          onClick={handleClick}
          className="absolute object-contain cursor-pointer"
          style={{
            top: "-48px",
            left: "45%",
            transform: "translate(-50%, -50%)",

            width: "24vw",
            maxWidth: "260px",
            minWidth: "180px",

            filter: `
              grayscale(0.05)
              contrast(1.12)
              brightness(0.95)
              drop-shadow(0 6px 8px rgba(0,0,0,0.35))
              drop-shadow(0 14px 18px rgba(0,0,0,0.25))
            `,
          }}
          animate={{
            rotate: progress * 90, // 🔥 doar crest
            opacity: peelProgress > 0.9 ? 0 : 1, // 🔥 dispare DUPĂ peel
            scale: 1 - peelProgress * 0.2,
          }}
          transition={{ duration: 0 }} // 🔥 important (no lag)
        />
      </div>
    </motion.div>
  );
}
