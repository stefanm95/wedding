import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { paperThemes, type PaperVariant } from "../../utils/paperThemes";

type Props = {
  variant?: PaperVariant;
};

const PaperBackground = ({ variant = "golden" }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.15, 0.4, 0.25],
  );
  const lightScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.05]);

  const theme = paperThemes[variant];

  return (
    <div
      ref={ref}
      className='absolute inset-0 z-0'
      style={{
        filter: theme.filter,

        WebkitMaskImage: `
      linear-gradient(
        to bottom,
        black 0%,
        black 70%,
        rgba(0,0,0,0.6) 80%,
        transparent 100%
      )
    `,
        maskImage: `
      linear-gradient(
        to bottom,
        black 0%,
        black 70%,
        rgba(0,0,0,0.6) 80%,
        transparent 100%
      )
    `,
      }}
    >
      {/* 🟤 BASE COLOR */}
      <div
        className='absolute inset-0'
        style={{ backgroundColor: theme.baseColor }}
      />

      {/* 🧻 MAIN PAPER (NO REPEAT, SLIGHT ZOOM) */}
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: "url('/assets/base-paper/bg-premium2.png')",
          backgroundSize: "contain", // 🔥 CRITICAL (no seam)
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: theme.paperOpacity,
        }}
      />

      {/* 🧬 EMBOSS LAYER (crest subtle) */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-paper/paper-soft-clean.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
          mixBlendMode: "multiply",
        }}
      />

      {/* 🌫 SOFT EDGE FADE (hides boundaries) */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
            linear-gradient(to right, ${theme.baseColor} 0%, transparent 12%, transparent 88%, ${theme.baseColor} 100%),
            linear-gradient(to bottom, ${theme.baseColor} 0%, transparent 12%, transparent 88%, ${theme.baseColor} 100%)
          `,
          opacity: 0.6,
        }}
      />

      {/* ✨ GRAIN (very important) */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: theme.grainSize,
          opacity: theme.grainOpacity,
          mixBlendMode: "multiply",
        }}
      />

      {/* 🌞 LIGHT (animated) */}
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

      {/* 🌑 VIGNETTE */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: theme.vignette,
        }}
      />
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.03), transparent)",
          opacity: 0.4,
        }}
      />

      {/* 💡 FINAL SOFT OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none mix-blend-soft-light ${theme.overlay}`}
      />
    </div>
  );
};

export default PaperBackground;
