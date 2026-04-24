import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Props = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  align?: "left" | "right" | "center";
  className?: string;
};

export default function InkRevealText({
  children,
  progress,
  align = "left",
  className = "",
}: Props) {
  // ✍️ reveal mai lent și mai natural
  const clip = useTransform(
    progress,
    [0, 0.6],
    [
      align === "right" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      "inset(0 0% 0 0)",
    ],
  );

  // blur foarte fin (nu cinematic)
  const blur = useTransform(progress, [0, 0.5], ["2px", "0px"]);

  // opacitate liniară
  const opacity = useTransform(progress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      style={{
        clipPath: clip,
        filter: blur,
        opacity,
      }}
      className={`relative ${className}`}
    >
      {/* 🖋️ TEXT */}
      <div
        className='
          relative
          text-[#6b1f2b]
          [text-shadow:0_0_0.4px_rgba(107,31,43,0.4)]
          [filter:contrast(1.02)_saturate(0.98)]
        '
      >
        {children}
      </div>

      {/* ✨ grain peste text */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "220px",
        }}
      />
    </motion.div>
  );
}
