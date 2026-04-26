import { motion } from "framer-motion";

export default function PolaroidCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      whileHover={{ rotate: -1.5, scale: 1.02 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className='relative -mt-16'
    >
      {/* 🌑 SHADOW */}
      <div
        className='
          absolute inset-0
          translate-y-8
          blur-xl
          opacity-25
          bg-black
        '
      />

      {/* 📄 POLAROID */}
      <div
        className='
          relative
          w-full max-w-[320px] md:max-w-[720px]
          bg-[#f4f1ea]
          p-4 md:p-8 pb-12 md:pb-16
          shadow-[0_25px_70px_rgba(0,0,0,0.18)]
        '
        style={{
          transform: "rotate(-2deg)",
        }}
      >
        {/* 🖼 IMAGE */}
        <div className='overflow-hidden'>
          <img
            alt='prima amintire'
            src='/assets/miri/lavanda.jpg'
            className='
              w-full
              h-[220px] md:h-[420px]
              object-cover
            '
          />
        </div>

        {/* ✍️ TITLE (IMPORTANT) */}
        <p
          className='
            script-castlegar
            text-center
            text-2xl md:text-3xl
            text-[#6b1f2b]
            mt-6
            tracking-[0.08em]
          '
          style={{ transform: "rotate(-0.8deg)" }}
        >
          Prima noastră amintire
        </p>

        {/* ✨ SUBTEXT (face toată diferența) */}
        <p
          className='
            text-center
            text-sm md:text-base
            mt-2
            text-[#6b1f2b]/70
            italic
            tracking-wide
          '
        >
          totul a început fără să știm
        </p>
      </div>
    </motion.div>
  );
}
