import type { CountdownTime } from "@/types/countdown";
import type { MotionValue } from "framer-motion";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";

import { motion } from "framer-motion";

type Props = CountdownTime & {
  months: number;
  floralY?: MotionValue<number>;
  isMobile?: boolean;
};

const labels = ["LUNI", "ZILE", "ORE", "MIN", "SEC"];
const floralSrc = optimizeCloudinaryUrl(
  "https://res.cloudinary.com/djzw55eub/image/upload/v1779606572/wedding/art/story-peon_i5i2vf_e_background_removal_f_png_aaxypp.png",
  480,
);

export default function Countdown({
  months,
  days,
  hours,
  minutes,
  seconds,
  floralY,
  isMobile,
}: Props) {
  const items = [months, days, hours, minutes, seconds];

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* ========================= */}
      {/* ✨ INVITATION BLOCK */}
      {/* ========================= */}

      <div className="relative mb-14">
        {/* 🌺 MOBILE FLORAL */}
        {isMobile && (
          <motion.img
            src={floralSrc}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute left-1/2 top-1/3 z-0 w-[250px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.15] mix-blend-multiply"
            style={{
              y: floralY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {isMobile && (
          <motion.img
            src={floralSrc}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute left-[-40px] top-[750px] z-0 w-[180px] -scale-x-100 select-none opacity-[0.1] mix-blend-multiply"
            style={{
              y: floralY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {/* ✨ TEXT */}
        <motion.div
          className="relative z-10 text-center text-[#6b1f2b]"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {/* intro */}
          <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-[#6b1f2b]/55 md:text-[11px]">
            Alături de nașii noștri
          </p>

          {/* names */}
          <div className="flex items-center justify-center gap-3 text-[18px] leading-none md:text-[30px]">
            <span>Daniela Alexandra</span>

            <span className="opacity-40">&</span>

            <span>Radu Andrei</span>
          </div>

          {/* surname */}
          <p className="mt-3 text-[12px] uppercase tracking-[0.28em] text-[#6b1f2b]/70">
            Botezat-Antonescu
          </p>

          {/* invitation */}
          <p className="text-[#6b1f2b]/72 mx-auto mt-7 max-w-[280px] text-[12px] leading-[2] tracking-[0.14em] md:text-[13px]">
            vă invităm cu drag
            <br />
            să ne fiți aproape
            <br />
            într-una dintre cele mai frumoase
            <br />
            zile ale vieții noastre
          </p>
        </motion.div>
      </div>

      {/* ========================= */}
      {/* ⏳ COUNTDOWN */}
      {/* ========================= */}

      <div className="grid grid-cols-5 items-center justify-center gap-4 md:gap-10">
        {items.map((value, i) => (
          <motion.div
            key={labels[i]}
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <span className="script-castlegar text-4xl leading-none text-[#6b1f2b] md:text-6xl">
              {value}
            </span>

            <span className="mt-2 text-[10px] tracking-[0.25em] text-[#6b1f2b]/70 md:text-xs">
              {labels[i]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ✨ LINE */}
      <motion.div
        className="mx-auto mt-6 h-[1px] w-[320px]"
        style={{
          background: "linear-gradient(to right, transparent, rgba(107,31,43,0.5), transparent)",
        }}
      />
    </motion.div>
  );
}
