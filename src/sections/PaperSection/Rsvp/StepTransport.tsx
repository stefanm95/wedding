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

export default function StepTransport({
  value,
  onChange,
  onNext,
  onBack,
}: Props) {
  const isSelected = (type: TransportType) => value?.type === type;

  const isValid = value?.type !== undefined;

  return (
    <motion.div
      variants={stepVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='space-y-12'
    >
      {/* BACK */}
      <button
        onClick={onBack}
        className='text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]'
      >
        ← Înapoi
      </button>

      {/* HEADER */}
      <div className='text-center space-y-6'>
        <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
          Aveți nevoie de transport?
        </h2>
      </div>

      {/* OPTIONS */}
      <div className='space-y-4'>
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              onChange({
                required: opt.required,
                type: opt.value,
              })
            }
            className={`
              w-full
              px-6 py-4
              border
              text-left
              transition
              ${
                isSelected(opt.value)
                  ? "border-[#c9a46c] bg-[#c9a46c]/10 text-[#6b1f2b]"
                  : "border-[#6b1f2b]/20 text-[#6b1f2b]/70 hover:border-[#6b1f2b]"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className='flex justify-center'>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`
            px-10 py-4
            tracking-[0.3em]
            uppercase
            border
            transition
            ${
              isValid
                ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
                : "border-[#6b1f2b]/20 text-[#6b1f2b]/30 cursor-not-allowed"
            }
          `}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
