import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  onNext: (attending: true | false) => void;
};

export function StepWelcome({ onNext }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} text-center`}
    >
      {/* ✨ INTRO (nu label de form) */}
      <div className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Denisa & Iuli</p>

        <h2 className="script-cormorant-display text-[36px] leading-tight text-[#3d2b1f]">
          Ne vei fi alături
          <br />
          în această zi?
        </h2>

        <p className="mx-auto max-w-[420px] text-[15px] leading-relaxed text-[#3d2b1f]/75">
          Pentru noi, prezența ta înseamnă mai mult decât putem pune în cuvinte.
        </p>
      </div>

      {/* ✨ DIVIDER (foarte important pentru vibe) */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
      </div>

      {/* 🎯 ACTIONS */}
      <div className="flex flex-col gap-4 pt-6">
        <button onClick={() => onNext(true)} className={rsvpStyles.primaryButton}>
          Vom fi acolo
        </button>

        <button onClick={() => onNext(false)} className={rsvpStyles.secondaryButton}>
          Din păcate nu putem ajunge
        </button>
      </div>
    </motion.div>
  );
}
