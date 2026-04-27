import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";
import type { RSVPTransport, TransportType } from "../../../types/rsvp";

type Props = {
  value: RSVPTransport;
  onChange: (val: RSVPTransport) => void;
  onNext: () => void;
  onBack: () => void;
};

const OPTIONS: {
  label: string;
  value: TransportType;
  required: boolean;
}[] = [
  { label: "Nu avem nevoie", value: "none", required: false },
  { label: "Transport organizat", value: "bus", required: true },
  { label: "Mașină personală", value: "personal", required: true },
];

export default function StepTransport({ value, onChange, onNext, onBack }: Props) {
  const isSelected = (type: TransportType) => value?.type === type;

  const isValid = value?.type !== undefined;

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
          Aveți nevoie de transport?
        </h2>
      </div>

      {/* OPTIONS */}
      <div className="space-y-4">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              onChange({
                required: opt.required,
                type: opt.value,
              })
            }
            className={`w-full border px-6 py-4 text-left transition ${
              isSelected(opt.value)
                ? "border-[#c9a46c] bg-[#c9a46c]/10 text-[#6b1f2b]"
                : "border-[#6b1f2b]/20 text-[#6b1f2b]/70 hover:border-[#6b1f2b]"
            } `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`border px-10 py-4 uppercase tracking-[0.3em] transition ${
            isValid
              ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
              : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30"
          } `}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
