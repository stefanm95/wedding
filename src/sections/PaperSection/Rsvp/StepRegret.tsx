import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
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
      className={`${rsvpStyles.step} text-center`}
    >
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Răspuns primit</p>
        <h2 className={rsvpStyles.title}>Ne pare rău că nu poți ajunge</h2>

        <p className={`${rsvpStyles.body} mx-auto max-w-[420px]`}>
          Îți vom simți lipsa în această zi specială, dar îți mulțumim că ne-ai anunțat. Sperăm să
          ne revedem curând.
        </p>
      </div>

      <button onClick={onClose} className={`${rsvpStyles.primaryButton} self-center`}>
        Închide
      </button>
    </motion.div>
  );
}
