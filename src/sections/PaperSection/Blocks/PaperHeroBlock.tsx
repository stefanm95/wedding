import type { PaperBlockProps } from "@/types/paper";
import { useCountdown } from "@hooks/useCountdown";
import Countdown from "@paper/Countdown/Countdown";
import PolaroidCard from "@paper/Countdown/PolaroidCard";
import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";

type Props = PaperBlockProps & {
  progress: MotionValue<number>;
};

export default function PaperHeroBlock({ progress }: Props) {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  /* ========================= */
  /* 🎬 SUBTLE SCROLL */
  /* ========================= */

  // minimal settle (NOT float)
  const y = useTransform(progress, [0, 0.3], [30, 0]);
  const rotate = useTransform(progress, [0, 0.3], [-2, -1]);
  const scale = useTransform(progress, [0, 0.3], [1.01, 1]);

  const countdownOpacity = useTransform(progress, [0.55, 0.4], [0, 2]);
  const countdownY = useTransform(progress, [0.3, 0.4], [20, 0]);

  return (
    <section id="paper-hero" className="relative pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* 📄 PAPER */}
        <div
          className="relative border border-black/5 px-6 py-16 md:px-12 md:py-20"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          {/* 📸 POLAROID (single source of truth) */}
          <motion.div className="flex justify-center" style={{ y, rotate, scale }}>
            <PolaroidCard />
          </motion.div>

          {/* ⏳ COUNTDOWN */}
          <motion.div
            className="mt-16 text-center"
            style={{ opacity: countdownOpacity, y: countdownY }}
          >
            <Countdown {...time} />
          </motion.div>
        </div>
        {/* 🧻 TEXTURE */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" />

        {/* divider */}
        <div className="mx-auto mt-20 h-16 w-[1px] bg-[#6b1f2b]/20" />
      </div>
    </section>
  );
}
