import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

type Props = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  align?: "left" | "right" | "center";
  className?: string;
  delay?: number; // 0 → 0.3 recomandat
};

export default function InkRevealText({
  children,
  progress,
  align = "left",
  className = "",
  delay = 0,
}: Props) {
  /**
   * 🧠 WINDOW BASED REVEAL
   * - începe mai devreme
   * - nu mai comprimă animația
   */
  const start = 0.15 + delay * 0.5;
  const end = start + 0.55;

  const reveal = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  });

  // ✂️ CLIP (mai natural)
  const clip = useTransform(
    reveal,
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

  // ✨ apare mai devreme
  const opacity = useTransform(reveal, [0, 0.2, 1], [0, 0.6, 1]);

  // ✨ blur mai subtil
  const blur = useTransform(reveal, [0, 1], ["2px", "0px"]);

  // 🖋️ lift mai fin
  const y = useTransform(reveal, [0, 1], [6, 0]);

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
      {/* TEXT */}
      <div
        className='
          relative
          text-[#6b1f2b]
          [text-shadow:0_0_0.4px_rgba(107,31,43,0.35)]
        '
        style={{
          mixBlendMode: "multiply",
        }}
      >
        {children}
      </div>

      {/* grain subtil */}
      <div
        className='absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "200px",
        }}
      />
    </motion.div>
  );
}
