import { motion } from "framer-motion";
import { cn } from "@utils/cn";
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
      className="space-y-12"
    >
      {/* BACK */}
      <button onClick={onBack} className="text-sm text-[#6b1f2b]/60 hover:text-[#6b1f2b]">
        ← Înapoi
      </button>

      {/* HEADER */}
      <div className="space-y-6 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
          Vrei să ne lași un mesaj?
        </h2>

        <p className="text-sm text-[#6b1f2b]/60">
          Orice detaliu ne ajută — alergii, preferințe sau întrebări 🤍
        </p>
      </div>

      {/* TEXTAREA */}
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Scrie aici mesajul tău..."
          className="min-h-[140px] w-full resize-none border border-[#6b1f2b]/20 bg-transparent p-4 text-[#6b1f2b] outline-none transition placeholder:text-[#6b1f2b]/40 focus:border-[#6b1f2b]"
        />
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className={cn(
            "border px-10 py-4 uppercase tracking-[0.3em] transition",
            isValid
              ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
              : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30",
          )}
        >
          Trimite RSVP
        </button>
      </div>
    </motion.div>
  );
}
