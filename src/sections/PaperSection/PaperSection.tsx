// PaperSection.tsx
import { forwardRef, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import PaperBackground from "./Blocks/PaperBackground";
import PaperHeroBlock from "./Blocks/PaperHeroBlock";
import PaperStoryBlock from "./Blocks/PaperStoryBlock";
import PaperProgramBlock from "./Blocks/PaperProgramBlock";

import type { PaperVariant } from "../../utils/paperThemes";
import { useMergedRefs } from "../../hooks/useMergedRefs";

const PaperSection = forwardRef<HTMLElement>((_, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);

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
    <section ref={mergedRef} className='relative z-20 overflow-hidden'>
      {/* 🧻 GLOBAL PAPER */}
      <div className='absolute inset-0'>
        <PaperBackground variant={variant} />
      </div>
      <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none' />
      {/* 📄 CONTENT FLOW */}
      <div className='relative z-10 flex flex-col'>
        <PaperHeroBlock />
        <PaperStoryBlock />
        <PaperProgramBlock />
      </div>
    </section>
  );
});

export default PaperSection;
