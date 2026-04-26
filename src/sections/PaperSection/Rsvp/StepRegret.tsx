import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  onClose: () => void;
};

export default function StepRegret({ onClose }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='text-center space-y-10'
    >
      <div className='space-y-6'>
        <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
          Ne pare rău că nu poți ajunge
        </h2>

        <p className='text-[#6b1f2b]/70 max-w-[420px] mx-auto leading-relaxed'>
          Îți vom simți lipsa în această zi specială, dar îți mulțumim că ne-ai
          anunțat. Sperăm să ne revedem curând 🤍
        </p>
      </div>

      <button
        onClick={onClose}
        className='
          px-10 py-4
          tracking-[0.3em]
          uppercase
          border border-[#c9a46c]
          text-[#6b1f2b]
          hover:bg-[#6b1f2b]
          hover:text-white
          transition
        '
      >
        Închide
      </button>
    </motion.div>
  );
}
