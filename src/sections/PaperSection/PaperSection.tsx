import { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";

import PaperBackground from "@paper/Blocks/PaperBackground";
import PaperHeroBlock from "@paper/Blocks/PaperHeroBlock";
import PaperProgramBlock from "@paper/Blocks/PaperProgramBlock";
import PaperStoryBlock from "@paper/Blocks/PaperStoryBlock";
import PaperShell from "@paper/PaperShell";
import PaperStack from "@paper/PaperStack";

import { useMergedRefs } from "@hooks/useMergedRefs";
import { usePaperScroll } from "@hooks/usePaperScroll";
import RsvpLayerInline from "@paper/Rsvp/RsvpLayer";
import PaperGrain from "@/components/PaperGrain";

const PaperSection = forwardRef<HTMLElement, { className?: string }>(({ className }, ref) => {
  const [showRsvp, setShowRsvp] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const mergedRef = useMergedRefs(sectionRef, ref);
  const rsvpRef = useRef<HTMLDivElement | null>(null);

  const { progress, variant, y, scale, shadow } = usePaperScroll(sectionRef);

  const handleOpenRsvp = () => {
    rsvpRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      setShowRsvp(true);
    }, 300);
  };

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
      <PaperGrain />

      {/* 📄 CONTENT STACK */}
      <motion.div transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <PaperStack>
          {/* 🔥 pass progress down (this is the key change) */}
          <PaperHeroBlock variant={variant} progress={progress} />
          <PaperStoryBlock variant={variant} progress={progress} />
          <PaperProgramBlock variant={variant} progress={progress} onOpenRsvp={handleOpenRsvp} />
        </PaperStack>
      </motion.div>

      <div ref={rsvpRef} className="relative z-10 -mt-24 overflow-visible md:-mt-32">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
          onViewportEnter={() => setShowRsvp(true)}
          animate={
            showRsvp
              ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
              : { clipPath: "inset(0 0 100% 0)", opacity: 0 }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <RsvpLayerInline />
        </motion.div>
      </div>
    </PaperShell>
  );
});

export default PaperSection;
