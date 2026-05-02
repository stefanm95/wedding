import type { RSVPFormData } from "@/types/rsvp";
import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  form: RSVPFormData;
  onNext: () => void;
  onBack: () => void;
};

export default function StepConfirm({ form, onNext, onBack }: Props) {
  const attendingGuests = [...form.guests, ...form.extraGuests].filter((guest) => guest.attending);

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={rsvpStyles.step}
    >
      <button onClick={onBack} className={rsvpStyles.backButton}>
        Inapoi
      </button>

      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Ultimul pas</p>
        <h2 className={rsvpStyles.title}>Confirmare RSVP</h2>
        <p className={rsvpStyles.body}>Verifica raspunsul inainte de trimitere.</p>
      </div>

      <div className="space-y-5 border-y border-[#6b1f2b]/10 py-6 text-[#3d2b1f]">
        <div>
          <p className={rsvpStyles.label}>Participanti</p>
          <p className="mt-2 text-[17px] leading-relaxed">
            {attendingGuests.map((guest) => guest.name).join(", ")}
          </p>
        </div>

        <div>
          <p className={rsvpStyles.label}>Transport</p>
          <p className="mt-2 text-[17px]">{form.transport?.type || "none"}</p>
        </div>

        {form.message && (
          <div>
            <p className={rsvpStyles.label}>Mesaj</p>
            <p className="mt-2 text-[17px] leading-relaxed">{form.message}</p>
          </div>
        )}
      </div>

      <div className={rsvpStyles.actionsEnd}>
        <button onClick={onNext} className={rsvpStyles.primaryButton}>
          Confirma si trimite
        </button>
      </div>
    </motion.div>
  );
}
