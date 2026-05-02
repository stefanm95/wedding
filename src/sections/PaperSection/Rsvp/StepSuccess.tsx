import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";

export default function StepSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${rsvpStyles.step} relative py-16 text-center`}
    >
      {/* ✨ ICON / SYMBOL */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-[22px] text-[#c9a46c]"
      >
        ✦
      </motion.div>

      {/* ✨ HEADER */}
      <div className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Confirmat</p>

        <h2 className="script-cormorant-display text-[40px] leading-tight text-[#3d2b1f]">
          Vă mulțumim
        </h2>

        {/* ornament */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
          <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        </div>
      </div>

      {/* ✨ MESSAGE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-[460px] text-[16px] leading-relaxed text-[#3d2b1f]/80"
      >
        Abia așteptăm să sărbătorim împreună această zi specială.
        <br />
        <span className="italic">Prezența voastră înseamnă foarte mult pentru noi.</span>
      </motion.p>

      {/* ✨ SUBTLE FOOT NOTE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10 text-[12px] tracking-[0.2em] text-[#6b1f2b]/40"
      >
        Denisa & Iuli
      </motion.p>
    </motion.div>
  );
}
