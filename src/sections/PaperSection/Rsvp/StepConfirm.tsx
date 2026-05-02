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
  const attendingGuests = [...form.guests, ...form.extraGuests].filter((g) => g.attending);

  const transportLabel = {
    none: "Nu este necesar transport",
    bus: "Transport organizat",
    personal: "Venim cu mașina",
  }[form.transport?.type || "none"];

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} relative pt-8`}
    >
      {/* 🔙 BACK */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 hover:text-[#6b1f2b]"
      >
        <span className="text-[14px]">←</span>
        Înapoi
      </button>

      {/* ✨ HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Confirmare</p>

        <h2 className="script-cormorant-display text-[36px] text-[#3d2b1f]">Totul este pregătit</h2>

        <p className="mx-auto max-w-[420px] text-[15px] text-[#3d2b1f]/75">
          Te rugăm să verifici încă o dată detaliile înainte de trimitere.
        </p>

        {/* ornament */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
          <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
          <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        </div>
      </div>

      {/* ✨ CONTENT (scrisoare style) */}
      <div className="mt-8 space-y-6 text-center text-[#3d2b1f]">
        {/* Guests */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#6b1f2b]/50">
            {attendingGuests.length === 1 ? "Va fi prezent:" : "Vor fi prezenți:"}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {attendingGuests.map((guest) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-[#c9a46c]/50 bg-white/40 px-4 py-2 text-[14px] text-[#3d2b1f]"
              >
                {guest.name}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto h-[1px] w-16 bg-[#6b1f2b]/10" />

        {/* Transport */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#6b1f2b]/50">Transport</p>

          <p className="mt-2 text-[16px]">{transportLabel}</p>
        </div>

        {/* Divider */}
        {form.message && (
          <>
            <div className="mx-auto h-[1px] w-16 bg-[#6b1f2b]/10" />

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#6b1f2b]/50">
                Mesajul vostru
              </p>

              <p className="mt-3 text-[16px] italic leading-relaxed text-[#3d2b1f]/80">
                “{form.message}”
              </p>
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          className="border border-[#c9a46c] px-8 py-3 text-[11px] uppercase tracking-[0.25em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white"
        >
          Trimite confirmarea
        </button>
      </div>
    </motion.div>
  );
}
