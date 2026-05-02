import { motion } from "framer-motion";

export default function PaperLight() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1.2 }}
      className="pointer-events-none absolute inset-0 z-[2]"
      style={{
        background: `
          radial-gradient(
            circle at 30% 20%,
            rgba(255,255,255,0.6),
            transparent 60%
          ),
          radial-gradient(
            circle at 70% 80%,
            rgba(0,0,0,0.15),
            transparent 70%
          )
        `,
      }}
    />
  );
}
