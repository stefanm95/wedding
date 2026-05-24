import { useDevice } from "@/hooks/useDevice";
import { useHeroLight } from "@/hooks/useHeroLight";
import { useHeroLightDir } from "@/hooks/useHeroLightDir";
import { cn } from "@utils/cn";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";

type Props = {
  className?: string;
  progress: MotionValue<number>;
};

export default function EmbossSeal({ className, progress }: Props) {
  const [hovered, setHovered] = useState(false);
  // const y = useTransform(progress, [0, 1], [40, -40]);

  const lightX = useTransform(progress, [0, 1], [-120, 120]);
  const lightOpacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.3, 0.15]);

  const mask =
    "[mask-image:url('https://res.cloudinary.com/djzw55eub/image/upload/v1779354994/wedding/art/crest/image-1_wps7le_efnupz.png')]";

  const light = useHeroLight();
  const dir = useHeroLightDir();
  const { isMobile, isTablet } = useDevice();
  const isCompact = isMobile || isTablet;

  // boost cinematic
  const boosted = light + Math.pow(light, 2) * 0.4;

  // 🔥 map direction → movement
  const offsetX = dir.x * 12;
  const offsetY = dir.y * 12;

  const pulseScale = hovered ? 1.2 : 1;
  const pulseLight = hovered ? 1.4 : 1;
  const pulseDepth = hovered ? 1.6 : 1;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      animate={{
        scale: pulseScale,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 14,
        mass: 0.6,
      }}
      style={{
        x: offsetX,
        y: offsetY,
        opacity: 0.2 + boosted * 0.3,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className,
      )}
    >
      {/* 🪶 BASE */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-contain bg-center bg-no-repeat opacity-40",
        )}
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/djzw55eub/image/upload/v1779354994/wedding/art/crest/image-1_wps7le_efnupz.png')",
          filter: "contrast(1.05) brightness(0.98)",
        }}
      />

      {/* 🌑 SHADOW (shape-based) */}
      <motion.div
        animate={{
          x: 4 * pulseDepth,
          y: 4 * pulseDepth,
          opacity: 0.4 * pulseLight,
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-black/25",
          "translate-x-[4px] translate-y-[4px]",
          isCompact ? "blur-[3px]" : "blur-[6px]",
          "opacity-40",
          "mix-blend-multiply",
          mask,
          "[mask-position:center]",
          "[mask-repeat:no-repeat]",
          "[mask-size:contain]",
        )}
      />

      {/* ✨ HIGHLIGHT (shape-based) */}
      <motion.div
        animate={{
          x: -3 * pulseDepth,
          y: -3 * pulseDepth,
          opacity: 0.3 * pulseLight,
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-white/40",
          "-translate-x-[3px] -translate-y-[3px]",
          isCompact ? "blur-[2px]" : "blur-[4px]",
          "opacity-30",
          "mix-blend-overlay",
          mask,
          "[mask-position:center]",
          "[mask-repeat:no-repeat]",
          "[mask-size:contain]",
        )}
      />

      {/* 💡 MOVING LIGHT */}
      <motion.div
        style={{
          x: lightX,
          opacity: lightOpacity,
        }}
        animate={{
          opacity: (lightOpacity.get() || 0.2) * pulseLight,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-gradient-to-r from-white/40 via-white/10 to-transparent",
          isCompact ? "blur-[10px]" : "blur-[20px]",
          "mix-blend-soft-light",
          mask,
          "[mask-position:center]",
          "[mask-repeat:no-repeat]",
          "[mask-size:contain]",
        )}
      />
    </motion.div>
  );
}
