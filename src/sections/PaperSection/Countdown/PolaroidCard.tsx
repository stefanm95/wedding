import { motion } from "framer-motion";

export default function PolaroidCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      whileHover={{ rotate: -1.5, scale: 1.02 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative -mt-16"
    >
      {/* 🌑 SHADOW */}
      <div className="absolute inset-0 translate-y-8 bg-black opacity-25 blur-xl" />

      {/* 📄 POLAROID */}
      <div
        className="relative w-full max-w-[320px] bg-[#f4f1ea] p-4 pb-12 shadow-[0_25px_70px_rgba(0,0,0,0.18)] md:max-w-[720px] md:p-8 md:pb-16"
        style={{
          transform: "rotate(-2deg)",
        }}
      >
        {/* 🖼 IMAGE */}
        <div className="overflow-hidden">
          <img
            alt="prima amintire"
            src="/assets/miri/lavanda.jpg"
            className="h-[220px] w-full object-cover md:h-[420px]"
          />
        </div>

        {/* ✍️ TITLE (IMPORTANT) */}
        <p
          className="script-castlegar mt-6 text-center text-2xl tracking-[0.08em] text-[#6b1f2b] md:text-3xl"
          style={{ transform: "rotate(-0.8deg)" }}
        >
          Prima noastra amintire
        </p>
      </div>
    </motion.div>
  );
}
