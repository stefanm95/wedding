import { motion } from "framer-motion";
import PaperPeelCanvas from "./PaperPeelCanvas";
import LightProbeCanvas from "./LightProbeCanvas";


type Props = {
  onOpen: () => void;
  progress: number;
  setProgress: (v: number) => void;
};

export default function HeroIntro({
  onOpen,
  progress,
  setProgress,
}: Props) {
  const handleClick = () => {
    let time = 0;

    const interval = setInterval(() => {
      time += 0.006;

      const t = Math.min(time, 1);
      setProgress(t);

      if (time >= 1.2) {
        clearInterval(interval);

        setTimeout(() => {
          onOpen();
        }, 300);
      }
    }, 16);
  };

  const crestProgress = progress;
  const peelProgress = progress;

  return (
    <div
      onClick={handleClick}
      className="absolute inset-0 z-20 cursor-pointer"
    >
      {/* 🔥 light probe */}
      <LightProbeCanvas />

      {/* 🎬 peel UI */}
      <motion.div
        className="absolute inset-0 z-[2]"
        animate={{
          opacity: progress > 0.95 ? 0 : 1,
        }}
        transition={{ duration: 0.6 }}
      >
        <PaperPeelCanvas
          crestProgress={crestProgress}
          peelProgress={peelProgress}
        />
      </motion.div>


      {/* 💡 impact */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 60%)",
          mixBlendMode: "soft-light",
        }}
        animate={{
          opacity: progress > 0.98 && progress < 1.05 ? 0.35 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}