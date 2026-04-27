import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  onClose: () => void;
};

export default function StepRegret({ onClose }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-10 text-center"
    >
      <div className="space-y-6">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
          Ne pare rău că nu poți ajunge
        </h2>

        <p className="mx-auto max-w-[420px] leading-relaxed text-[#6b1f2b]/70">
          Îți vom simți lipsa în această zi specială, dar îți mulțumim că ne-ai anunțat. Sperăm să
          ne revedem curând 🤍
        </p>
      </div>

      <button
        onClick={onClose}
        className="border border-[#c9a46c] px-10 py-4 uppercase tracking-[0.3em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white"
      >
        Închide
      </button>
    </motion.div>
  );
}
