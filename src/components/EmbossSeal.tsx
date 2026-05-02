import { motion, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@utils/cn";

type Props = {
  className?: string;
  progress: MotionValue<number>;
};

export default function EmbossSeal({ className, progress }: Props) {
  const y = useTransform(progress, [0, 1], [40, -40]);

  const lightX = useTransform(progress, [0, 1], [-120, 120]);
  const lightOpacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.3, 0.15]);

  const mask = "[mask-image:url('/assets/crest/image-1.png')]";

  return (
    <motion.div
      style={{ y }}
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
          backgroundImage: "url('/assets/crest/image-1.png')",
          filter: "contrast(1.05) brightness(0.98)",
        }}
      />

      {/* 🌑 SHADOW (shape-based) */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-black/25",
          "translate-x-[4px] translate-y-[4px]",
          "blur-[6px]",
          "opacity-40",
          "mix-blend-multiply",
          mask,
          "[mask-position:center]",
          "[mask-repeat:no-repeat]",
          "[mask-size:contain]",
        )}
      />

      {/* ✨ HIGHLIGHT (shape-based) */}
      <div
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-white/40",
          "-translate-x-[3px] -translate-y-[3px]",
          "blur-[4px]",
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
        className={cn(
          "absolute h-[420px] w-[420px]",
          "md:h-[520px] md:w-[520px]",
          "bg-gradient-to-r from-white/40 via-white/10 to-transparent",
          "blur-[20px]",
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
