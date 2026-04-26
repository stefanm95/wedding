// PaperSection.tsx
import { forwardRef, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import PaperBackground from "./Blocks/PaperBackground";
import PaperHeroBlock from "./Blocks/PaperHeroBlock";
import PaperStoryBlock from "./Blocks/PaperStoryBlock";
import PaperProgramBlock from "./Blocks/PaperProgramBlock";

import type { PaperVariant } from "../../utils/paperThemes";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(
  ({ className }, ref) => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    });

    const [variant, setVariant] = useState<PaperVariant>("day");

    useMotionValueEvent(scrollYProgress, "change", (v) => {
      if (v < 0.3) setVariant("day");
      else if (v < 0.7) setVariant("golden");
      else setVariant("evening");
    });

    return (
      <section ref={ref} className={`relative z-20 ${className ?? ""}`}>
        {/* 🧻 GLOBAL PAPER */}
        <div className='absolute inset-0'>
          <PaperBackground variant={variant} />
        </div>
        {/* 🧻 CINEMATIC PAPER EDGE */}
        <div className='absolute top-0 left-0 w-full z-30 pointer-events-none'>
          {/* 🔥 HARD CONTACT (lipire reală) */}
          <div
            className='w-full h-[2px]'
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
            }}
          />

          {/* 🪵 THICKNESS (grosime hârtie) */}
          <div
            className='w-full h-[10px]'
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.08), transparent)",
            }}
          />

          {/* 🌫 SOFT SHADOW (fade cinematic) */}
          <div
            className='w-full h-[80px]'
            style={{
              background: `
        radial-gradient(
          ellipse at top,
          rgba(0,0,0,0.35),
          rgba(0,0,0,0.18) 35%,
          rgba(0,0,0,0.08) 55%,
          transparent 75%
        )
      `,
              filter: "blur(6px)",
              transform: "translateY(-20px)",
            }}
          />
        </div>
        {/* 📄 CONTENT FLOW */}
        <div className='relative z-10 flex flex-col'>
          <PaperHeroBlock />
          <PaperStoryBlock />
          <PaperProgramBlock />
        </div>
      </section>
    );
  },
);

export default PaperSection;
