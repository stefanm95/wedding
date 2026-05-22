import { motion } from "framer-motion";

type Props = {
  intensity?: number;
};

export default function CinematicOverlay({ intensity = 3 }: Props) {
  return (
    <>
      {/* 🎬 VIGNETTE */}
      <div
        className="pointer-events-none absolute inset-0"
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
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/djzw55eub/image/upload/v1779354915/wedding/grain/grain3_sqtxx0_jbppsd.jpg')",
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
