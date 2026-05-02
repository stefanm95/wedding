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
      className={rsvpStyles.step}
    >
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Confirmare</p>
        <h2 className={rsvpStyles.title}>Veți fi alături de noi?</h2>
        <p className={rsvpStyles.body}>Ne-ar bucura să știm dacă veți fi parte din ziua noastră.</p>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        <button onClick={() => onNext(true)} className={rsvpStyles.primaryButton}>
          Da, vom fi prezenți
        </button>

        <button onClick={() => onNext(false)} className={rsvpStyles.secondaryButton}>
          Nu putem ajunge
        </button>
      </div>
    </motion.div>
  );
}
