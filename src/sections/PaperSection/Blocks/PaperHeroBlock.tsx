import { motion } from "framer-motion";
import { useCountdown } from "@hooks/useCountdown";
import Countdown from "@paper/Countdown/Countdown";
import PolaroidCard from "@paper/Countdown/PolaroidCard";

export default function PaperHeroBlock() {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className="relative py-28 text-center md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        {/* 📸 POLAROID — HERO EMOTIONAL */}
        <motion.div
          className="-mt-10 flex justify-center md:-mt-20"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <PolaroidCard />
        </motion.div>

        {/* 🌫 SHADOW LINK (ancoră vizuală) */}
        <div
          className="mx-auto -mt-6 h-[40px] w-[220px] opacity-20 blur-xl md:w-[420px]"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.25), transparent 70%)",
          }}
        />

        {/* ⏳ COUNTDOWN (secundar, integrat) */}
        <div className="mt-8 opacity-90 md:mt-10">
          <Countdown {...time} />
        </div>
        <div
          className="mx-auto mt-10 h-12 w-[1px] opacity-20"
          style={{
            background: "linear-gradient(to bottom, #6b1f2b, transparent)",
          }}
        />
      </div>
    </section>
  );
}
