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
      initial='initial'
      animate='animate'
      exit='exit'
      className='space-y-12'
    >
      {/* 🔙 BACK */}
      <button
        onClick={onBack}
        className='text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]'
      >
        ← Înapoi
      </button>

      {/* 🎯 CONTENT */}
      <div className='space-y-8 text-center'>
        <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
          Cum vă numiți?
        </h2>

        {/* ✨ INPUT */}
        <input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Numele complet'
          className='
            w-full
            text-center
            bg-transparent
            border-b border-[#6b1f2b]/20
            focus:border-[#6b1f2b]
            outline-none
            py-4
            text-[20px]
            text-[#6b1f2b]
            placeholder:text-[#6b1f2b]/40
            transition
          '
        />
      </div>

      {/* 🔘 CTA */}
      <div className='flex justify-center'>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`
            px-10 py-4
            tracking-[0.3em]
            uppercase
            border
            transition
            ${
              isValid
                ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
                : "border-[#6b1f2b]/20 text-[#6b1f2b]/30 cursor-not-allowed"
            }
          `}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
