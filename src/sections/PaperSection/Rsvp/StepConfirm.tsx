import type { RSVPFormData } from "@/types/rsvp";
import { motion } from "framer-motion";
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
      className="space-y-10"
    >
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        Inapoi
      </button>

      <div className="space-y-5 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
          Confirmare RSVP
        </h2>
        <p className="text-sm text-[#6b1f2b]/60">Verifica raspunsul inainte de trimitere.</p>
      </div>

      <div className="space-y-4 border-y border-[#6b1f2b]/10 py-6 text-[#6b1f2b]">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#6b1f2b]/50">Participanti</p>
          <p className="mt-1 text-lg">{attendingGuests.map((guest) => guest.name).join(", ")}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#6b1f2b]/50">Transport</p>
          <p className="mt-1 text-lg">{form.transport?.type || "none"}</p>
        </div>

        {form.message && (
          <div>
            <p className="text-xs uppercase tracking-widest text-[#6b1f2b]/50">Mesaj</p>
            <p className="mt-1 text-lg">{form.message}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="border border-[#c9a46c] px-10 py-4 uppercase tracking-[0.3em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white"
        >
          Confirma si trimite
        </button>
      </div>
    </motion.div>
  );
}
