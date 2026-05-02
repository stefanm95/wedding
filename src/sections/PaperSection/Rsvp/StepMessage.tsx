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
  const isValid = true; // mesajul e opțional

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={rsvpStyles.step}
    >
      <button onClick={onBack} className={rsvpStyles.backButton}>
        Înapoi
      </button>

      {/* HEADER */}
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Mesaj</p>
        <h2 className={rsvpStyles.title}>Vrei să ne lași un mesaj?</h2>

        <p className={rsvpStyles.body}>
          Dacă vrei să ne transmiți ceva în plus, ne bucurăm să citim.
        </p>
      </div>

      {/* TEXTAREA */}
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Scrie aici mesajul tău..."
          className="min-h-[150px] w-full resize-none border-b border-[#6b1f2b]/30 bg-transparent pb-2 text-[16px] text-[#3d2b1f] outline-none transition placeholder:text-[#6b1f2b]/35 focus:border-[#6b1f2b]"
        />
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          className={cn(
            rsvpStyles.primaryButton,
            isValid
              ? "border-[#c9a46c]"
              : `${rsvpStyles.disabledButton} hover:bg-transparent hover:text-[#6b1f2b]/30`,
          )}
        >
          Trimite RSVP
        </button>
      </div>
    </motion.div>
  );
}
