import { motion } from "framer-motion";
import { useCountdown } from "@hooks/useCountdown";
import Countdown from "@paper/Countdown/Countdown";
import PolaroidCard from "@paper/Countdown/PolaroidCard";
import type { PaperBlockProps } from "@/types/paper";

export default function PaperHeroBlock({ variant }: PaperBlockProps) {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className="relative py-32 md:py-40 lg:py-52">
      <div className="mx-auto max-w-4xl px-6">
        {/* 📄 PAPER LAYER */}
        <div
          className="relative border border-black/5 bg-transparent px-6 py-16 shadow-[0_40px_120px_rgba(0,0,0,0.08)] md:px-12 md:py-20"
          style={{ transform: "rotate(-0.5deg)" }}
        >
          {/* 🔥 FLOATING POLAROID (not boxed anymore) */}
          <div className="relative z-10 flex justify-center">
            <PolaroidCard />
          </div>

          {/* ⏳ COUNTDOWN */}
          <div className="relative z-10 mt-16 text-center">
            <Countdown {...time} />
          </div>

          {/* ✨ FAKE LIGHT / DEPTH */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-40" />
        </div>
        <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-[0.06]" />

        {/* 👇 TRANSITION LINE */}
        <div className="mx-auto mt-20 h-16 w-[1px] bg-[#6b1f2b]/20" />
      </div>
    </section>
  );
}
