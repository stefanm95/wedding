import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  onNext: () => void;
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
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Denisa & Iulian</p>

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
        <button
          onClick={onNext}
          className="group relative mx-auto mt-6 inline-flex flex-col items-center text-[12px] uppercase tracking-[0.35em] text-[#6b1f2b]/60 transition-all duration-300 hover:text-[#6b1f2b]"
        >
          Începe confirmarea
          {/* underline animat */}
          <span className="mt-2 h-[1px] w-12 bg-[#c9a46c]/60 transition-all duration-300 group-hover:w-20 group-hover:bg-[#c9a46c]" />
          {/* mic indicator ↓ */}
          <span className="mt-1 text-[10px] opacity-50 transition group-hover:opacity-80">↓</span>
        </button>
      </div>
    </motion.div>
  );
}
