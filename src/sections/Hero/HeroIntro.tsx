import { motion } from "framer-motion";
import { useState } from "react";
import PaperPeelCanvas from "./PaperPeelCanvas";

type Props = {
  onOpen: () => void;
};

export default function HeroIntro({ onOpen }: Props) {
  const [crestProgress, setCrestProgress] = useState(0);
  const [peelProgress, setPeelProgress] = useState(0);

  const handleClick = () => {
    let t = 0;

    const interval = setInterval(() => {
      t += 0.006;

      const crest = Math.min(t, 1);
      setCrestProgress(crest);

      const rotation = crest * 360;

      // 🔥 perfect sync
      const peelStart = 90;
      const peelEnd = 360;

      if (rotation > peelStart) {
        const peelT = (rotation - peelStart) / (peelEnd - peelStart);
        setPeelProgress(Math.min(peelT, 1));
      }

      if (t >= 1.2) {
        clearInterval(interval);

        setTimeout(onOpen, 600);
      }
    }, 16);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer"
      style={{
        backgroundImage: `
          linear-gradient(rgba(20,25,18,0.7), rgba(20,25,18,0.85)),
          url('/assets/paperboard-texture.jpg')
        `,
        backgroundSize: "cover",
      }}
    >
      <PaperPeelCanvas
        crestProgress={crestProgress}
        peelProgress={peelProgress}
      />
    </motion.div>
  );
}