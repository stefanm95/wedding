import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepMessage({
  value,
  onChange,
  onNext,
  onBack,
}: Props) {
  const isValid = true; // mesajul e opțional

  return (
    <motion.div
      variants={stepVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='space-y-12'
    >
      {/* BACK */}
      <button
        onClick={onBack}
        className='text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]'
      >
        ← Înapoi
      </button>

      {/* HEADER */}
      <div className='text-center space-y-6'>
        <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
          Vrei să ne lași un mesaj?
        </h2>

        <p className='text-sm text-[#6b1f2b]/60'>
          Orice detaliu ne ajută — alergii, preferințe sau întrebări 🤍
        </p>
      </div>

      {/* TEXTAREA */}
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Scrie aici mesajul tău...'
          className='
            w-full
            min-h-[140px]
            bg-transparent
            border border-[#6b1f2b]/20
            focus:border-[#6b1f2b]
            outline-none
            p-4
            text-[#6b1f2b]
            placeholder:text-[#6b1f2b]/40
            transition
            resize-none
          '
        />
      </div>

      {/* CTA */}
      <div className='flex justify-center'>
        <button
          onClick={onNext}
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
          Trimite RSVP
        </button>
      </div>
    </motion.div>
  );
}
