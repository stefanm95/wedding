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
      <PaperBackground progress={progress} />

      <div className="pointer-events-none absolute left-0 top-0 z-30 w-full">
        <div
          className="h-[1px] w-full"
          style={{
            background: "rgba(0,0,0,0.18)",
          }}
        />

        <div
          className="h-[40px] w-full"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.12),
                rgba(0,0,0,0.06) 40%,
                rgba(0,0,0,0.02) 70%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      <PaperStack>
        <PaperStoryBlock variant={variant} />
        <PaperHeroBlock variant={variant} />
        <PaperProgramBlock variant={variant} />
      </PaperStack>
    </PaperShell>
  );
});

export default PaperSection;
