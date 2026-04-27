import { motion } from "framer-motion";
import { cn } from "@utils/cn";
import { stepVariants } from "./stepVariants";
import type { DietaryOption, RSVPGuest, RSVPStatus } from "@/types/rsvp";

type Props = {
  guests: RSVPGuest[];
  onChange: (guests: RSVPGuest[]) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepGuests({ guests, onChange, onNext, onBack }: Props) {
  const toggleAttending = (index: number, value: RSVPStatus) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], attending: value };
    onChange(updated);
  };

  const updateDietary = (index: number, value: DietaryOption) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], dietary: value };
    onChange(updated);
  };

  const confirmedCount = guests.filter((g) => g.attending === "yes").length;

  const isValid = confirmedCount > 0; // măcar unul vine

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
          Confirmați participanții
        </h2>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {guests.map((guest, index) => (
          <div key={index} className="space-y-3 border-b border-[#6b1f2b]/10 pb-4">
            {/* NAME */}
            <div className="flex items-center justify-between">
              <span className="text-[#6b1f2b]">{guest.name}</span>

              {/* YES / NO */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAttending(index, "yes")}
                  className={cn(
                    "border px-3 py-1 text-sm",
                    guest.attending === "yes"
                      ? "bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  Da
                </button>

                <button
                  onClick={() => toggleAttending(index, "no")}
                  className={cn(
                    "border px-3 py-1 text-sm",
                    guest.attending === "no"
                      ? "bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  Nu
                </button>
              </div>
            </div>

            {/* DIETARY doar dacă vine */}
            {guest.attending === "yes" && (
              <select
                value={guest.dietary || "none"}
                onChange={(e) => updateDietary(index, e.target.value as DietaryOption)}
                className="border-b border-[#6b1f2b]/20 bg-transparent text-sm text-[#6b1f2b]/70 outline-none"
              >
                <option value="none">Fără restricții</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Fără gluten</option>
                <option value="other">Altceva</option>
              </select>
            )}
          </div>
        ))}
      </div>

      {/* INFO */}
      <div className="text-center text-sm text-[#6b1f2b]/60">
        {confirmedCount} persoane confirmate
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
