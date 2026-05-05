import { motion } from "framer-motion";

export default function PaperGrain() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dswwhzem5/image/upload/v1777956948/grain2_icfdek.jpg')",
        backgroundSize: "300px",
        mixBlendMode: "multiply",
      }}
    />
  );
}
