import { motion } from "framer-motion";
import Countdown from "../Countdown/Countdown";
import PolaroidCard from "../Countdown/PolaroidCard";
import { useCountdown } from "../../../hooks/useCountdown";

export default function PaperHeroBlock() {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className='relative py-28 md:py-36 text-center'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* 📸 POLAROID — HERO EMOTIONAL */}
        <motion.div
          className='flex justify-center -mt-10 md:-mt-20'
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <PolaroidCard />
        </motion.div>

        {/* 🌫 SHADOW LINK (ancoră vizuală) */}
        <div
          className='mx-auto w-[220px] md:w-[420px] h-[40px] blur-xl opacity-20 -mt-6'
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.25), transparent 70%)",
          }}
        />

        {/* ✍️ MICRO INTRO (leagă de story) */}
        <p className='mt-6 text-sm md:text-base italic text-[#6b1f2b]/70'>
          o poveste care a început fără să știm
        </p>

        {/* ⏳ COUNTDOWN (secundar, integrat) */}
        <div className='mt-8 md:mt-10 opacity-90'>
          <Countdown {...time} />
        </div>
      </div>
    </section>
  );
}
