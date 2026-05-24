import { useDevice } from "@/hooks/useDevice";
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

  const { width } = useDevice();

  /* ========================= */
  /* 📱 RESPONSIVE ART DIRECTION */
  /* ========================= */

  const isMobileLayout = width < 700;
  const isMediumLayout = width >= 700 && width < 1400;
  const isLargeDesktop = width >= 1400;

  /* ========================= */
  /* 🎬 SUBTLE SCROLL */
  /* ========================= */

  const y = useTransform(progress, [0, 0.3], [30, 0]);

  const rotate = useTransform(progress, [0, 0.3], [-2, -1]);

  const scale = useTransform(progress, [0, 0.3], [1.01, 1]);

  const countdownOpacity = useTransform(progress, [0.55, 0.4], [0, 2]);

  const countdownY = useTransform(progress, [0.3, 0.4], [20, 0]);

  const floatY = useTransform(progress, [0, 1], [0, -30]);

  return (
    <section id="paper-hero" className="relative pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* 📄 PAPER */}
        <div
          className="relative border border-black/5 px-6 py-16 md:px-12 md:py-20"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          {/* ⏳ COUNTDOWN */}
          <motion.div
            className="mb-24 text-center"
            style={{
              opacity: countdownOpacity,
              y: countdownY,
            }}
          >
            <Countdown {...time} floralY={floatY} isMobile={isMobileLayout} />
          </motion.div>

          {/* 📸 POLAROID */}
          <motion.div
            className="flex justify-center"
            style={{
              y,
              rotate,
              scale,
            }}
          >
            <PolaroidCard />
          </motion.div>
        </div>

        {/* 🧻 TEXTURE */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" />

        {/* ========================= */}
        {/* 🌺 MEDIUM LAYOUT FLORAL */}
        {/* ========================= */}

        {isMediumLayout && (
          <motion.img
            src="https://res.cloudinary.com/djzw55eub/image/upload/v1779606572/wedding/art/story-peon_i5i2vf_e_background_removal_f_png_aaxypp.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-40px] top-[20px] z-0 w-[260px] select-none opacity-[0.10] mix-blend-multiply lg:w-[320px]"
            style={{
              y: floatY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {isMediumLayout && (
          <motion.img
            src="https://res.cloudinary.com/djzw55eub/image/upload/v1779606572/wedding/art/story-peon_i5i2vf_e_background_removal_f_png_aaxypp.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[40px] left-[-30px] z-0 w-[180px] -scale-x-100 select-none opacity-[0.1] mix-blend-multiply lg:w-[220px]"
            style={{
              y: floatY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {/* ========================= */}
        {/* 🌺 LARGE DESKTOP FLORAL */}
        {/* ========================= */}

        {isLargeDesktop && (
          <motion.img
            src="https://res.cloudinary.com/djzw55eub/image/upload/v1779606572/wedding/art/story-peon_i5i2vf_e_background_removal_f_png_aaxypp.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-140px] top-[80px] z-0 w-[420px] select-none opacity-[0.16] mix-blend-multiply lg:w-[520px]"
            style={{
              y: floatY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {isLargeDesktop && (
          <motion.img
            src="https://res.cloudinary.com/djzw55eub/image/upload/v1779606572/wedding/art/story-peon_i5i2vf_e_background_removal_f_png_aaxypp.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[20px] left-[-120px] z-0 w-[320px] -scale-x-100 select-none opacity-[0.1] mix-blend-multiply lg:w-[420px]"
            style={{
              y: floatY,

              filter: "grayscale(0.08) sepia(0.12) contrast(1.04) brightness(0.98)",
            }}
          />
        )}

        {/* divider */}
        <div className="relative flex justify-center overflow-visible">
          <div className="absolute left-1/2 top-1/2 h-16 w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[#6b1f2b]/20" />
        </div>
      </div>
    </section>
  );
}
