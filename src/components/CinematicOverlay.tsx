import { motion } from "framer-motion";

type Props = {
  intensity?: number;
};

export default function CinematicOverlay({ intensity = 1 }: Props) {
  return (
    <>
      {/* 🎬 VIGNETTE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              rgba(0,0,0,0) 50%,
              rgba(0,0,0,${0.45 * intensity}) 100%
            )
          `,
        }}
      />

      {/* 🎞 FILM GRAIN */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          mixBlendMode: "overlay",
          opacity: 0.06 * intensity,
        }}
        animate={{
          opacity: [0.04, 0.07, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}