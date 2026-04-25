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
    <div
      ref={ref}
      className='absolute inset-0 z-0'
      style={{ filter: theme.filter }}
    >
      {/* 🟤 BASE */}
      <div
        className='absolute inset-0'
        style={{ backgroundColor: theme.baseColor }}
      />

      {/* 🧻 PAPER */}
      <div
        className='absolute inset-0 opacity-[0.25]'
        style={{
          backgroundImage:
            "url('/assets/base-paper/paper-high-resolution.jpg')",
          backgroundSize: "cover",
          opacity: theme.paperOpacity,
        }}
      />

      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
      radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05), transparent 60%),
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06), transparent 60%)
    `,
        }}
      />

      {/* 🌫 DEPTH */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            "url('/assets/base-paper/paper-high-resolution-warm.jpg')",
          backgroundSize: "cover",
          opacity: theme.depthOpacity,
        }}
      />

      {/* ✨ GRAIN */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: theme.grainSize,
          opacity: theme.grainOpacity,
          mixBlendMode: "multiply",
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

      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: theme.vignette,
        }}
      />

      {/* 💡 OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none mix-blend-soft-light ${theme.overlay}`}
      />

      {/* 🧻 EDGE */}
      <div className='absolute top-0 left-0 w-full h-40 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent' />
      </div>
    </div>
  );
};

export default PaperBackground;
