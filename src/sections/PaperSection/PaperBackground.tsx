import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { paperThemes, type PaperVariant } from "../../utils/paperThemes";

type Props = {
  variant?: PaperVariant;
};

const PaperBackground = ({ variant = "day" }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.5, 0.3],
  );
  const lightScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);

  const theme = paperThemes[variant];

  return (
    <div ref={ref} className='absolute inset-0 z-0'>
      {/* 🟤 BASE */}
      <div
        className='absolute inset-0'
        style={{ backgroundColor: theme.baseColor }}
      />

      {/* 🧻 PAPER */}
      <div
        className='absolute inset-0 opacity-[0.45]'
        style={{
          backgroundImage: "url('/assets/base-paper/base-paper5.png')",
          backgroundSize: "cover",
        }}
      />

      {/* 🌫 DEPTH */}
      <div
        className='absolute inset-0 opacity-[0.25]'
        style={{
          backgroundImage: "url('/assets/base-paper/base-paper7.jpg')",
          backgroundSize: "cover",
        }}
      />

      {/* ✨ GRAIN */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "300px",
          opacity: 0.18,
          mixBlendMode: "overlay",
        }}
      />

      {/* 🌞 LIGHT */}
      <motion.div
        style={{
          opacity: lightOpacity,
          scale: lightScale,
        }}
        className='absolute inset-0 pointer-events-none'
      >
        <div
          className='absolute inset-0'
          style={{ background: theme.lightGradient }}
        />
      </motion.div>

      {/* 💡 OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none mix-blend-soft-light ${theme.overlay}`}
      />

      {/* 🧻 EDGE */}
      <div className='absolute top-0 left-0 w-full h-40 pointer-events-none'>
        <div className='absolute top-0 left-0 w-full h-[2px] bg-white/40' />
        <div className='absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/20 to-transparent' />
        <div className='absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent' />
        <div className='absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#f4f1ea] via-[#f4f1ea]/80 to-transparent' />
      </div>
    </div>
  );
};

export default PaperBackground;
