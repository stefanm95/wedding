import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Props = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  align?: "left" | "right" | "center";
  className?: string;
  delay?: number; // 🔥 nou
};

export default function InkRevealText({
  children,
  progress,
  align = "left",
  className = "",
  delay = 0,
}: Props) {
  // 🔥 delay cinematic
  const delayed = useTransform(progress, (v) =>
    Math.max(0, Math.min(1, (v - delay) / (1 - delay))),
  );

  // ✍️ reveal mai lung și mai smooth
  const clip = useTransform(
    delayed,
    [0, 1],
    [
      align === "right"
        ? "inset(0 0 0 100%)"
        : align === "center"
          ? "inset(0 50% 0 50%)"
          : "inset(0 100% 0 0)",
      "inset(0 0% 0 0)",
    ],
  );

  // ✨ fade mai natural
  const opacity = useTransform(delayed, [0, 0.4], [0, 1]);

  // ✨ blur mai soft
  const blur = useTransform(delayed, [0, 0.6], ["3px", "0px"]);

  // 🖋️ micro lift
  const y = useTransform(delayed, [0, 1], [10, 0]);

  return (
    <motion.div
      style={{
        clipPath: clip,
        filter: blur,
        opacity,
        y,
      }}
      className={`relative ${className}`}
    >
      {/* 🖋️ TEXT */}
      <div
        className='
          relative
          text-[#6b1f2b]
          [text-shadow:0_0_0.4px_rgba(107,31,43,0.35)]
          [filter:contrast(1.02)_saturate(0.98)]
        '
      >
        {children}
      </div>

      {/* ✨ grain subtil */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "220px",
        }}
      />
    </motion.div>
  );
}
