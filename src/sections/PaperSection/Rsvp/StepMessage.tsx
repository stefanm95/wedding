import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepMessage({ value, onChange, onNext, onBack }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} relative pt-8`}
    >
      {/* 🔙 BACK */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* ✨ HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Gânduri</p>

        <h2 className="script-cormorant-display text-[34px] italic leading-tight text-[#3d2b1f]">
          Un gând pentru noi?
        </h2>
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
          <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        </div>

        <p className="mx-auto max-w-[420px] text-[15px] leading-relaxed text-[#3d2b1f]/75">
          Dacă vrei să ne lași un mesaj, îl vom citi cu drag.
        </p>
      </div>

      {/* ✨ TEXTAREA */}
      <div className="relative pt-6">
        {/* ✨ faint lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_0px,transparent_28px,rgba(107,31,43,0.08)_29px)] bg-[length:100%_32px]" />
        </div>

        <motion.textarea
          value={value}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Scrie câteva cuvinte..."
          className="script-cormorant-body relative z-10 min-h-[140px] w-full resize-none bg-transparent px-1 pt-1 text-[16px] italic leading-[32px] text-[#3d2b1f] outline-none placeholder:text-[#6b1f2b]/35"
        />
      </div>

      {/* ✨ SKIP HINT */}
      {!value && (
        <p className="pt-3 text-center text-[12px] text-[#6b1f2b]/40">
          Poți continua și fără mesaj
        </p>
      )}
      {value && <p className="pt-2 text-center text-[12px] text-[#6b1f2b]/40">Mulțumim 🤍</p>}

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button onClick={onNext} className={cn(rsvpStyles.primaryButton, "border-[#c9a46c]")}>
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
