import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepName({ value, onChange, onNext, onBack }: Props) {
  const isValid = value.trim().length > 2;

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-12"
    >
      {/* 🔙 BACK */}
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        ← Înapoi
      </button>

      {/* 🎯 CONTENT */}
      <div className="space-y-8 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">Cum vă numiți?</h2>

        {/* ✨ INPUT */}
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Numele complet"
          className="w-full border-b border-[#6b1f2b]/20 bg-transparent py-4 text-center text-[20px] text-[#6b1f2b] outline-none transition placeholder:text-[#6b1f2b]/40 focus:border-[#6b1f2b]"
        />
      </div>

      {/* 🔘 CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`border px-10 py-4 uppercase tracking-[0.3em] transition ${
            isValid
              ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
              : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30"
          } `}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
