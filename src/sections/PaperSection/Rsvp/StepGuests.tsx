import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import { stepVariants } from "./stepVariants";
import type { DietaryOption, RSVPGuest } from "@/types/rsvp";

type Props = {
  guests: RSVPGuest[];
  onChange: (guests: RSVPGuest[]) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepGuests({ guests, onChange, onNext, onBack }: Props) {
  const updateGuest = (index: number, value: string) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], name: value };
    onChange(updated);
  };

  const addGuest = () => {
    onChange([...guests, { name: "", dietary: "none" as const }]);
  };

  const removeGuest = (index: number) => {
    const updated = guests.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateGuestDietary = (index: number, value: DietaryOption) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], dietary: value };
    onChange(updated);
  };

  const isValid = guests.every((g) => g.name.trim().length > 1);

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
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">Cine vă însoțește?</h2>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {guests.map((guest, index) => (
          <div key={index} className="group space-y-2">
            {/* ROW */}
            <div className="flex items-center gap-4">
              <input
                value={guest.name}
                onChange={(e) => updateGuest(index, e.target.value)}
                placeholder={`Invitat ${index + 1}`}
                className="flex-1 border-b border-[#6b1f2b]/20 bg-transparent py-3 text-[#6b1f2b] outline-none placeholder:text-[#6b1f2b]/40 focus:border-[#6b1f2b]"
              />

              {guests.length > 1 && (
                <button
                  onClick={() => removeGuest(index)}
                  className="text-[#6b1f2b]/40 opacity-0 transition hover:text-[#6b1f2b] group-hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 🔥 DIETARY PER GUEST */}
            <select
              value={guest.dietary || "none"}
              onChange={(e) => updateGuestDietary(index, e.target.value as DietaryOption)}
              className="border-b border-[#6b1f2b]/20 bg-transparent text-sm text-[#6b1f2b]/70 outline-none focus:border-[#6b1f2b]"
            >
              <option value="none">Fără restricții</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Fără gluten</option>
              <option value="other">Altceva</option>
            </select>
          </div>
        ))}
      </div>

      {/* ADD */}
      <div className="flex justify-center">
        <button
          onClick={addGuest}
          className="text-sm uppercase tracking-[0.3em] text-[#c9a46c] transition hover:text-[#6b1f2b]"
        >
          + Adaugă invitat
        </button>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            "border px-10 py-4 uppercase tracking-[0.3em] transition",
            isValid
              ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
              : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30",
          )}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
