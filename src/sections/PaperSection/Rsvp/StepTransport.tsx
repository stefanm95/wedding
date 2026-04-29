import type { RSVPTransport, TransportType } from "@/types/rsvp";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";
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
      className="space-y-12"
    >
      {/* BACK */}
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        ← Înapoi
      </button>

      {/* HEADER */}
      <div className="space-y-6 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
          Transport pentru cei care participă
        </h2>
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
                "w-full border px-6 py-4 text-left transition",
                isSelected(opt.value)
                  ? "border-[#c9a46c] bg-[#c9a46c]/10 text-[#6b1f2b]"
                  : "border-[#6b1f2b]/20 text-[#6b1f2b]/70 hover:border-[#6b1f2b]",
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
                <div className="mt-3 rounded-md border border-[#6b1f2b]/10 bg-[#6b1f2b]/5 p-4 text-sm text-[#6b1f2b]/80">
                  <p className="font-medium">🚌 Transport organizat</p>

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
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="border border-[#c9a46c] px-10 py-4 uppercase tracking-[0.3em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white"
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
