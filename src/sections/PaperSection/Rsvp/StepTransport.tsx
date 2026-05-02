import type { RSVPTransport, TransportType } from "@/types/rsvp";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  value: RSVPTransport;
  onChange: (val: RSVPTransport) => void;
  onNext: () => void;
  onBack: () => void;
};

const OPTIONS: { label: string; value: TransportType }[] = [
  { label: "Nu avem nevoie", value: "none" },
  { label: "Transport organizat", value: "bus" },
  { label: "Venim cu mașina", value: "personal" },
];

export default function StepTransport({ value, onChange, onNext, onBack }: Props) {
  const [showInfo, setShowInfo] = useState(false);

  const isSelected = (type: TransportType) => value?.type === type;

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
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* ✨ HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Organizare</p>

        <h2 className="script-cormorant-display text-[34px] leading-tight text-[#3d2b1f]">
          Cum ajungi la eveniment?
        </h2>

        <p className="mx-auto max-w-[420px] text-[15px] leading-relaxed text-[#3d2b1f]/75">
          Pentru a ne organiza mai bine, spune-ne cum plănuiești să ajungi.
        </p>
      </div>

      {/* ✨ OPTIONS */}
      <div className="space-y-4 pt-6">
        {OPTIONS.map((opt) => (
          <div key={opt.value}>
            <button
              onClick={() => {
                onChange({ type: opt.value });

                if (opt.value === "bus") setShowInfo(true);
                else setShowInfo(false);
              }}
              className={cn(
                rsvpStyles.option,
                "text-center",
                isSelected(opt.value)
                  ? "border-[#c9a46c] bg-white/25 text-[#3d2b1f]"
                  : "border-[#6b1f2b]/15",
              )}
            >
              {opt.label}
            </button>

            {/* 🚌 INFO */}
            {opt.value === "bus" && isSelected("bus") && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : -5 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 border-l border-[#c9a46c] pl-4 text-left">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b1f2b]/60">
                    Detalii transport
                  </p>

                  <p className="mt-2 text-[14px] text-[#3d2b1f]/80">
                    Plecarea va avea loc din <strong>Piața Unirii</strong> la ora{" "}
                    <strong>15:30</strong>.
                  </p>

                  <p className="mt-1 text-[14px] text-[#3d2b1f]/70">
                    Te rugăm să fii acolo cu 10 minute înainte.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button onClick={onNext} className={rsvpStyles.primaryButton}>
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
