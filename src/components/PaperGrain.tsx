import { motion } from "framer-motion";

export default function PaperGrain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage: "url('/assets/base-grain/grain2.jpg')",
        backgroundSize: "300px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
