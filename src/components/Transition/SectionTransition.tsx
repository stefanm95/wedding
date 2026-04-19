import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  from?: "dark" | "light";
  to?: "dark" | "light";
};

export default function SectionTransition({
  from = "dark",
  to = "light",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // subtle parallax fade
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const gradient =
    from === "dark" && to === "light"
      ? "linear-gradient(to bottom, #0b0b0b, #f5f0e6)"
      : "linear-gradient(to bottom, #f5f0e6, #0b0b0b)";

  return (
    <motion.div ref={ref} style={{ opacity }} className='relative h-40 w-full'>
      {/* Gradient */}
      <div
        className='absolute inset-0'
        style={{
          background: gradient,
        }}
      />

      {/* Optional soft blur layer */}
      <div
        className='absolute inset-0'
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
        }}
      />
    </motion.div>
  );
}
