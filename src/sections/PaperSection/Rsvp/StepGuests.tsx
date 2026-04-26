import { useEffect } from "react";
import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";
import type { RSVPGuest, RSVPStatus } from "../../../types/rsvp";

type Props = {
  guests: RSVPGuest[];
  attending: RSVPStatus;
  onChange: (guests: RSVPGuest[]) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepGuests({
  guests,
  attending,
  onChange,
  onNext,
  onBack,
}: Props) {
  // ❌ skip dacă nu vine
  useEffect(() => {
    if (attending === "no") {
      onNext();
    }
  }, [attending, onNext]);

  if (attending === "no") return null;

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

  const isValid = guests.every((g) => g.name.trim().length > 1);

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
          Cine vă însoțește?
        </h2>
      </div>

      {/* LIST */}
      <div className='space-y-6'>
        {guests.map((guest, index) => (
          <div key={index} className='flex items-center gap-4 group'>
            <input
              value={guest.name}
              onChange={(e) => updateGuest(index, e.target.value)}
              placeholder={`Invitat ${index + 1}`}
              className='
                flex-1
                bg-transparent
                border-b border-[#6b1f2b]/20
                focus:border-[#6b1f2b]
                outline-none
                py-3
                text-[#6b1f2b]
                placeholder:text-[#6b1f2b]/40
              '
            />

            {/* REMOVE */}
            {guests.length > 1 && (
              <button
                onClick={() => removeGuest(index)}
                className='
                  opacity-0 group-hover:opacity-100
                  text-[#6b1f2b]/40 hover:text-[#6b1f2b]
                  transition
                '
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ADD */}
      <div className='flex justify-center'>
        <button
          onClick={addGuest}
          className='
            text-sm
            tracking-[0.3em]
            uppercase
            text-[#c9a46c]
            hover:text-[#6b1f2b]
            transition
          '
        >
          + Adaugă invitat
        </button>
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
