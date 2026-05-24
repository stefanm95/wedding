import { useDevice } from "@/hooks/useDevice";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";
import { motion } from "framer-motion";

const grainSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779354915/wedding/grain/grain3_sqtxx0_jbppsd.jpg",
  320,
);

type Props = {
  intensity?: number;
};

export default function CinematicOverlay({ intensity = 3 }: Props) {
  const { isMobile, isTablet } = useDevice();
  const shouldAnimateGrain = !isMobile && !isTablet;

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
          backgroundImage: `url('${grainSrc}')`,
          mixBlendMode: "overlay",
          opacity: 0.06 * intensity,
        }}
        animate={shouldAnimateGrain ? { opacity: [0.04, 0.07, 0.05] } : undefined}
        transition={
          shouldAnimateGrain
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />
    </>
  );
}
