import { motion } from "framer-motion";
import type { CountdownTime } from "../../../types/countdown";

export default function Countdown({
  days,
  hours,
  minutes,
  seconds,
}: CountdownTime) {
  const items = [days, hours, minutes, seconds];

  return (
    <motion.div
      className='text-center mt-12'
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className='flex justify-center gap-6 md:gap-12 text-[#6b1f2b]'>
        {items.map((value, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6 },
              },
            }}
          >
            <div className='text-4xl md:text-5xl text-[#6b1f2b] script-castlegar opacity-90'>
              {value}
            </div>

            <div className='text-xs tracking-[0.5em] mt-2 opacity-50'>
              {["ZILE", "ORE", "MIN", "SEC"][i]}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
