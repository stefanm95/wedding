import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import { stepVariants } from "./stepVariants";
import type { RSVPTransport, TransportType } from "@/types/rsvp";

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
          <button
            key={opt.value}
            onClick={() =>
              onChange({
                type: opt.value,
              })
            }
            className={cn(
              "w-full border px-6 py-4 text-left transition",
              isSelected(opt.value)
                ? "border-[#c9a46c] bg-[#c9a46c]/10 text-[#6b1f2b]"
                : "border-[#6b1f2b]/20 text-[#6b1f2b]/70 hover:border-[#6b1f2b]",
            )}
          >
            {opt.label}
          </button>
        ))}

        {value.type === "bus" && (
          <input
            placeholder="Locație preluare"
            value={value.pickupLocation || ""}
            onChange={(e) =>
              onChange({
                ...value,
                pickupLocation: e.target.value,
              })
            }
          />
        )}
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
