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
  { label: "Mașină personală", value: "personal" },
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
      className={rsvpStyles.step}
    >
      <button onClick={onBack} className={rsvpStyles.backButton}>
        Înapoi
      </button>

      {/* HEADER */}
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Transport</p>
        <h2 className={rsvpStyles.title}>Cum veți ajunge?</h2>
        <p className={rsvpStyles.body}>Alegeți varianta potrivită pentru seara evenimentului.</p>
      </div>

      {/* OPTIONS */}
      <div className="space-y-4">
        {OPTIONS.map((opt) => (
          <div key={opt.value}>
            <button
              onClick={() => {
                onChange({ type: opt.value });

                // 🔥 show info automatically when bus is selected
                if (opt.value === "bus") {
                  setShowInfo(true);
                } else {
                  setShowInfo(false);
                }
              }}
              className={cn(
                rsvpStyles.option,
                isSelected(opt.value)
                  ? "border-[#c9a46c] bg-white/25 text-[#3d2b1f]"
                  : "border-[#6b1f2b]/15",
              )}
            >
              {opt.label}
            </button>

            {/* 🚌 BUS INFO */}
            {opt.value === "bus" && isSelected("bus") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: showInfo ? 1 : 0, height: showInfo ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 border-l border-[#c9a46c] py-2 pl-4 text-[14px] leading-relaxed text-[#3d2b1f]/80">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b1f2b]/60">
                    Transport organizat
                  </p>

                  <p className="mt-2">
                    Plecarea va avea loc din <strong>Piața Unirii</strong> la ora{" "}
                    <strong>15:30</strong>.
                  </p>

                  <p className="mt-1">Vă rugăm să fiți prezenți cu 10 minute înainte.</p>
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
