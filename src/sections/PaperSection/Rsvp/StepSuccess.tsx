import { motion } from "framer-motion";

export default function StepSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='text-center space-y-8 py-10'
    >
      {/* ICON */}
      <div className='text-4xl'>🤍</div>

      {/* TITLE */}
      <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
        Vă mulțumim!
      </h2>

      {/* MESSAGE */}
      <p className='text-[#6b1f2b]/70 max-w-md mx-auto leading-relaxed'>
        Abia așteptăm să sărbătorim împreună această zi specială. Prezența
        voastră înseamnă foarte mult pentru noi.
      </p>
    </motion.div>
  );
}
