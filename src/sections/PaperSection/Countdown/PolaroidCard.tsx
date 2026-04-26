import { motion } from "framer-motion";

export default function PolaroidCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
      whileHover={{ rotate: -1.2, scale: 1.02 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='relative'
    >
      {/* 🌑 SHADOW (realistic, layered) */}
      <div
        className='
          absolute inset-0
          translate-y-6
          blur-xl
          opacity-30
          bg-black
          rounded-[2px]
        '
      />

      {/* 📄 PAPER */}
      <div
        className='
          relative
          w-full max-w-[320px] md:max-w-[720px]
          bg-[#f4f1ea]
          p-4 md:p-8 pb-10 md:pb-14
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        '
        style={{
          transform: "rotate(-2deg)",
        }}
      >
        {/* 🖼 IMAGE */}
        <div className='overflow-hidden'>
          <img
            alt='lavanda'
            src='/assets/miri/lavanda.jpg'
            className='
              w-full
              h-[220px] md:h-[420px]
              object-cover
            '
          />
        </div>

        {/* ✍️ TEXT */}
        <p
          className='
            script-castlegar
            text-center
            text-2xl md:text-3xl
            text-[#6b1f2b]
            mt-5
            tracking-[0.08em]
          '
          style={{
            transform: "rotate(-0.8deg)",
          }}
        >
          AU MAI RAMAS
        </p>
      </div>
    </motion.div>
  );
}
