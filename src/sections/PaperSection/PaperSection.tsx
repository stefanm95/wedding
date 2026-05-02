import { forwardRef, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PaperBackground from "@paper/Blocks/PaperBackground";
import PaperHeroBlock from "@paper/Blocks/PaperHeroBlock";
import PaperProgramBlock from "@paper/Blocks/PaperProgramBlock";
import PaperStoryBlock from "@paper/Blocks/PaperStoryBlock";
import PaperShell from "@paper/PaperShell";
import PaperStack from "@paper/PaperStack";
import RsvpLayer from "@paper/Rsvp/RsvpLayer";

import { useMergedRefs } from "@hooks/useMergedRefs";
import { usePaperScroll } from "@hooks/usePaperScroll";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(({ className }, ref) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

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
      <motion.div
        animate={{
          scale: isRsvpOpen ? 0.96 : 1,
          y: isRsvpOpen ? -40 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <PaperStack>
          {/* 🔥 pass progress down (this is the key change) */}
          <PaperHeroBlock variant={variant} progress={progress} />
          <PaperStoryBlock variant={variant} progress={progress} />
          <PaperProgramBlock
            variant={variant}
            progress={progress}
            onOpenRsvp={() => setIsRsvpOpen(true)}
          />
        </PaperStack>
      </motion.div>

      <AnimatePresence>
        {isRsvpOpen && <RsvpLayer onClose={() => setIsRsvpOpen(false)} />}
      </AnimatePresence>
    </PaperShell>
  );
});

export default PaperSection;
