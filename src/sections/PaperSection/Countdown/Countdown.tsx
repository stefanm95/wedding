import { motion } from "framer-motion";
import type { CountdownTime } from "../../../types/countdown";

type ExtendedTime = CountdownTime & {
  months: number;
};

const labels = ["LUNI", "ZILE", "ORE", "MIN", "SEC"];

export default function Countdown({
  months,
  days,
  hours,
  minutes,
  seconds,
}: ExtendedTime) {
  const items = [months, days, hours, minutes, seconds];

  return (
    <motion.div
      className='relative mt-10'
      initial='hidden'
      whileInView='show'
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
        className='text-sm md:text-base tracking-[0.3em] text-[#6b1f2b]/80 mb-6'
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0 },
        }}
      >
        PÂNĂ LA ZIUA NOASTRĂ
      </motion.p>

      {/* ⏳ GRID RESPONSIVE */}
      <div className='grid grid-cols-5 gap-4 md:gap-10 justify-center items-end'>
        {items.map((value, i) => (
          <motion.div
            key={i}
            className='flex flex-col items-center'
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            {/* 🔢 VALUE */}
            <span className='script-castlegar text-4xl md:text-6xl text-[#6b1f2b] leading-none'>
              {value}
            </span>

            {/* 🏷 LABEL */}
            <span className='text-[10px] md:text-xs tracking-[0.25em] mt-2 text-[#6b1f2b]/70'>
              {labels[i]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ✨ LINE */}
      <motion.div
        className='mx-auto mt-6 w-[160px] h-[1px]'
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(107,31,43,0.5), transparent)",
        }}
      />

      {/* ✍️ SUBTEXT */}
      <motion.p className='mt-4 text-sm italic text-[#6b1f2b]/70'>
        fiecare zi ne aduce mai aproape
      </motion.p>
    </motion.div>
  );
}
