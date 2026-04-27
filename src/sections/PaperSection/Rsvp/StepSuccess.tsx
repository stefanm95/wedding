import { motion } from "framer-motion";

export default function StepSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 py-10 text-center"
    >
      {/* ICON */}
      <div className="text-4xl">🤍</div>

      {/* TITLE */}
      <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">Vă mulțumim!</h2>

      {/* MESSAGE */}
      <p className="mx-auto max-w-md leading-relaxed text-[#6b1f2b]/70">
        Abia așteptăm să sărbătorim împreună această zi specială. Prezența voastră înseamnă foarte
        mult pentru noi.
      </p>
    </motion.div>
  );
}
