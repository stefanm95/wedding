import { motion } from "framer-motion";

export default function PolaroidCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* 📄 PRINTED AREA (no shadow, no card feel) */}
      <div className="relative w-full max-w-[340px] md:max-w-[520px]">
        {/* 🖼 IMAGE - PRINTED INTO PAPER */}
        <div className="relative overflow-hidden">
          {/* image */}
          <img
            alt="prima amintire"
            src="https://res.cloudinary.com/djzw55eub/image/upload/v1779354943/wedding/couple/lavanda_zokn81_apl1rp.jpg"
            className="/* 🔥 KEY: kill digital sharpness */ h-[240px] w-full object-cover brightness-[0.98] contrast-[0.92] saturate-[0.9] md:h-[420px]"
          />

          {/* 🔥 PRINT FADE (edges slightly absorbed in paper) */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)]" />

          {/* 🔥 PAPER BLEED LIGHT */}
          <div className="pointer-events-none absolute inset-0 bg-[#f4f1ea]/20 mix-blend-multiply" />
        </div>

        {/* ✍️ HANDWRITTEN CAPTION */}
        <p
          className="script-gary-display mt-5 text-center text-[#6b1f2b]/90 md:text-3xl"
          style={{ transform: "rotate(-0.6deg)" }}
        ></p>
      </div>
    </motion.div>
  );
}
