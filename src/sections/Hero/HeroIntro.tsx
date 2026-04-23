import { motion } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [t, setT] = useState(0); // 🔥 timeline real

  const handleClick = () => {
    let time = 0;

    const interval = setInterval(() => {
      time += 0.006; // 🔥 viteză globală

      setT(time);

      if (time >= 1.3) {
        clearInterval(interval);
        setTimeout(onOpen, 400);
      }
    }, 16);
  };

  // 🎯 PHASES
  const crestProgress = Math.min(t, 1);

  const peelStart = 0;
  const peelProgress =
    crestProgress < peelStart
      ? 0
      : (crestProgress - peelStart) / (1 - peelStart);

  // 🧠 HOLD + FADE
  let opacity = 1;

  if (t > 1.05) {
    // 🔥 începe DUPĂ ce totul s-a terminat
    opacity = 1 - (t - 1.05) / (1.3 - 1.05);
  }

  opacity = Math.pow(opacity, 1.6);

  return (
    <motion.div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer"
      animate={{ opacity }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        backgroundImage: `
          linear-gradient(rgba(20,25,18,0.7), rgba(20,25,18,0.8)),
          url('/assets/paperboard-texture.jpg')
        `,
      }}
    >
      <PaperPeelCanvas
        crestProgress={crestProgress}
        peelProgress={Math.min(peelProgress, 1)}
      />
    </motion.div>
  );
}