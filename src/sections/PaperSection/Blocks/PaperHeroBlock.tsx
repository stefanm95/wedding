import { motion } from "framer-motion";
import { useCountdown } from "@hooks/useCountdown";
import Countdown from "@paper/Countdown/Countdown";
import PolaroidCard from "@paper/Countdown/PolaroidCard";
import type { PaperBlockProps } from "@/types/paper";

export default function PaperHeroBlock({ variant }: PaperBlockProps) {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section data-paper-variant={variant} className="relative py-28 md:py-36 lg:py-44">
      <div className="mx-auto max-w-3xl px-6">
        {/* 📄 HERO SHEET (this is the missing piece) */}
        <div
          className="relative border border-black/5 bg-[#f8f6f2]/90 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-[2px] md:p-14"
          style={{
            transform: "rotate(-0.4deg)",
          }}
        >
          {/* 📸 POLAROID */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <PolaroidCard />
          </motion.div>

          {/* ⏳ COUNTDOWN */}
          <div className="mt-10 text-center">
            <Countdown {...time} />
          </div>
        </div>

        {/* subtle separation from next section */}
        <div className="mx-auto mt-16 h-10 w-[1px] bg-black opacity-10" />
      </div>
    </section>
  );
}
