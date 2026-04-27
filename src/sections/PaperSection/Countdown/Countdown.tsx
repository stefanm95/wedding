import { motion } from "framer-motion";
import type { CountdownTime } from "../../../types/countdown";

type ExtendedTime = CountdownTime & {
  months: number;
};

const labels = ["LUNI", "ZILE", "ORE", "MIN", "SEC"];

export default function Countdown({ months, days, hours, minutes, seconds }: ExtendedTime) {
  const items = [months, days, hours, minutes, seconds];

  return (
    <motion.div
      className="relative mt-10"
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
      {/* ✨ TITLE */}
      <motion.p
        className="mb-6 text-sm tracking-[0.3em] text-[#6b1f2b]/80 md:text-base"
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0 },
        }}
      >
        PÂNĂ LA ZIUA NOASTRĂ
      </motion.p>

      {/* ⏳ GRID RESPONSIVE */}
      <div className="grid grid-cols-5 items-end justify-center gap-4 md:gap-10">
        {items.map((value, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {/* 🔢 VALUE */}
            <span className="script-castlegar text-4xl leading-none text-[#6b1f2b] md:text-6xl">
              {value}
            </span>

            {/* 🏷 LABEL */}
            <span className="mt-2 text-[10px] tracking-[0.25em] text-[#6b1f2b]/70 md:text-xs">
              {labels[i]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ✨ LINE */}
      <motion.div
        className="mx-auto mt-6 h-[1px] w-[160px]"
        style={{
          background: "linear-gradient(to right, transparent, rgba(107,31,43,0.5), transparent)",
        }}
      />

      {/* ✍️ SUBTEXT */}
      <motion.p className="mt-4 text-sm italic text-[#6b1f2b]/70">
        fiecare zi ne aduce mai aproape
      </motion.p>
    </motion.div>
  );
}
