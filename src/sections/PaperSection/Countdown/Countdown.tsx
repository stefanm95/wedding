import { motion } from "framer-motion";

export default function Countdown({ days, hours, minutes, seconds }: any) {
  const items = [days, hours, minutes, seconds];

  return (
    <motion.div
      className="text-center mb-32 mt-12"
      initial="hidden"
      whileInView="show"
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
      <div className="flex justify-center gap-10 text-[#6b1f2b]">
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
            <div className="text-5xl text-[#6b1f2b] script-castlegar">{value}</div>

            <div className="text-sm  script-cormorant tracking-[0.6em] mt-2 opacity-60">
              {["ZILE", "ORE", "MIN", "SEC"][i]}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
