import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@utils/cn";

type Props = {
  className?: string;
  progress: MotionValue<number>; // 👈 IMPORTANT
};

export default function EmbossSeal({ className, progress }: Props) {
  /* 🎬 PARALLAX (moves slower than content) */
  const y = useTransform(progress, [0, 1], [40, -40]);

  /* 💡 LIGHT SWEEP (left → right) */
  const lightX = useTransform(progress, [0, 1], [-120, 120]);
  const lightOpacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.3, 0.15]);

  return (
    <motion.div
      style={{ y }}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className,
      )}
    >
      {/* 🪶 BASE EMBOSS IMAGE */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-contain bg-center bg-no-repeat",
          "opacity-40",
        )}
        style={{
          backgroundImage: "url('/assets/crest/image-1.png')",
          filter: "contrast(1.05) brightness(0.98)",
        }}
      />

      {/* 💡 MOVING LIGHT (cinematic sweep) */}
      <motion.div
        style={{
          x: lightX,
          opacity: lightOpacity,
        }}
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-gradient-to-r from-white/40 via-white/10 to-transparent",
          "blur-[20px]",
          "mix-blend-soft-light",
        )}
      />

      {/* 🌑 DEPTH SHADOW */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-black/20",
          "blur-[12px]",
          "translate-x-[6px] translate-y-[6px]",
          "opacity-30",
          "mix-blend-multiply",
        )}
      />

      {/* ✨ TOP HIGHLIGHT */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-white/30",
          "blur-[10px]",
          "-translate-x-[4px] -translate-y-[4px]",
          "opacity-25",
          "mix-blend-overlay",
        )}
      />
    </motion.div>
  );
}
