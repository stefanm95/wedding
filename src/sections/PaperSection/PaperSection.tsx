import { forwardRef, useRef } from "react";

import PaperBackground from "@paper/Blocks/PaperBackground";
import PaperHeroBlock from "@paper/Blocks/PaperHeroBlock";
import PaperProgramBlock from "@paper/Blocks/PaperProgramBlock";
import PaperStoryBlock from "@paper/Blocks/PaperStoryBlock";
import PaperShell from "@paper/PaperShell";
import PaperStack from "@paper/PaperStack";

import { useMergedRefs } from "@hooks/useMergedRefs";
import { usePaperScroll } from "@hooks/usePaperScroll";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(({ className }, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);

  const { progress, variant, y, scale, shadow } = usePaperScroll(sectionRef);

  return (
    <PaperShell sectionRef={mergedRef} className={className} y={y} scale={scale} shadow={shadow}>
      {/* 🌅 GLOBAL BACKGROUND */}
      <PaperBackground progress={progress} />

      {/* 🎬 TOP LIGHT EDGE (keep, but softer) */}
      <div className="pointer-events-none absolute left-0 top-0 z-30 w-full">
        <div className="h-[1px] w-full bg-black/15" />

        <div
          className="h-[36px] w-full"
          style={{
            background: `
                linear-gradient(
                  to bottom,
                  rgba(0,0,0,0.10),
                  rgba(0,0,0,0.05) 40%,
                  rgba(0,0,0,0.02) 70%,
                  transparent 100%
                )
              `,
          }}
        />
      </div>

      {/* 📄 CONTENT STACK */}
      <PaperStack>
        {/* 🔥 pass progress down (this is the key change) */}
        <PaperHeroBlock variant={variant} progress={progress} />
        <PaperStoryBlock variant={variant} progress={progress} />
        <PaperProgramBlock variant={variant} progress={progress} />
      </PaperStack>
    </PaperShell>
  );
});

export default PaperSection;
