import { forwardRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Countdown from "./Countdown/Countdown";
import Story from "./Story/Story";
import Timeline from "./Timeline/Timeline";
import PolaroidCard from "../../components/PolaroidCard";
import { useCountdown } from "../../hooks/useCountdown";

export default forwardRef(function PaperSection(_, ref) {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, -40]);

  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <motion.section
      ref={ref}
      className="relative z-20 min-h-screen py-32 px-6 overflow-hidden"
      style={{ y }}
    >
      {/* 🎨 BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/base-paper/paperboard-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/10 z-0" />

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

        {/* 🧻 REALISTIC PAPER EDGE */}
        <div className="absolute top-0 left-0 w-full h-40 z-20 pointer-events-none">
          {/* ✨ highlight edge */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/40" />

          {/* 🌤 soft light spread */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/20 to-transparent" />

          {/* 🌑 contact shadow */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent" />

          {/* 🌫 depth fade */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#f4f1ea] via-[#f4f1ea]/800 to-transparent" />
        </div>
      {/* 🎬 CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* POLAROID */}
        <motion.div
          initial={{ opacity: 0, y: 120, rotate: -10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-24"
        >
          <PolaroidCard />
        </motion.div>

        {/* COUNTDOWN */}
        <Countdown {...time} />

        {/* STORY */}
        <Story />

        {/* TIMELINE */}
        <Timeline />
      </div>
    </motion.section>
  );
});
