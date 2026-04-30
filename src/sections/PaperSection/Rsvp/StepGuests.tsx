import type { DietaryOption, RSVPGuest, RSVPStatus } from "@/types/rsvp";
import { toGuestId } from "@/utils/rsvpValidation";
import { cn } from "@utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];
  maxGuests: number;

  onChange: (guests: RSVPGuest[], extraGuests: RSVPGuest[]) => void;

  onNext: () => void;
  onBack: () => void;
};

export default function StepGuests({
  guests,
  extraGuests,
  maxGuests,
  onChange,
  onNext,
  onBack,
}: Props) {
  /* ---------------- MEMBERS ---------------- */

  const toggleAttending = (index: number, value: RSVPStatus) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], attending: value };
    onChange(updated, extraGuests);
  };

  const updateDietary = (index: number, value: DietaryOption) => {
    const updated = [...guests];
    updated[index] = { ...updated[index], dietary: value };
    onChange(updated, extraGuests);
  };

  /* ---------------- EXTRA GUESTS ---------------- */

  const addExtraGuest = () => {
    if (!canAddMore) return;

    onChange(guests, [
      ...extraGuests,
      { id: `extra-${Date.now()}`, name: "", attending: true, dietary: "none" },
    ]);
  };

  const updateExtraGuest = (index: number, field: keyof RSVPGuest, value: any) => {
    const updated = [...extraGuests];
    const nextGuest = { ...updated[index], [field]: value };
    updated[index] =
      field === "name" ? { ...nextGuest, id: `extra-${toGuestId(String(value))}` } : nextGuest;
    onChange(guests, updated);
  };

  const removeExtraGuest = (index: number) => {
    onChange(
      guests,
      extraGuests.filter((_, i) => i !== index),
    );
  };

  /* ---------------- LOGIC ---------------- */

  const confirmedMembers = guests.filter((g) => g.attending).length;
  const confirmedExtra = extraGuests.filter((g) => g.attending).length;

  const confirmedCount = confirmedMembers + confirmedExtra;

  const remaining = maxGuests - confirmedCount;
  const canAddMore = remaining > 0;

  const isValid = confirmedCount > 0;

  /* ---------------- UI ---------------- */

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
      <div className="space-y-4 text-center">
        <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
          Confirmați participanții
        </h2>

        <p className="text-sm text-[#6b1f2b]/60">
          {confirmedCount} confirmați • mai puteți adăuga {remaining} invitați
        </p>
      </div>

      {/* MEMBERS */}
      <div className="space-y-6">
        {guests.map((guest, index) => (
          <div key={index} className="space-y-3 border-b border-[#6b1f2b]/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-[#6b1f2b]">{guest.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAttending(index, true)}
                  className={cn(
                    "border px-3 py-1 text-sm",
                    guest.attending
                      ? "bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  Da
                </button>

                <button
                  onClick={() => toggleAttending(index, false)}
                  className={cn(
                    "border px-3 py-1 text-sm",
                    !guest.attending
                      ? "bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  Nu
                </button>
              </div>
            </div>

            {guest.attending && (
              <select
                title="dietary options"
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

      {/* EXTRA GUESTS */}
      <div className="space-y-4">
        <h3 className="text-center text-sm uppercase tracking-widest text-[#6b1f2b]/70">
          Invitați suplimentari
        </h3>

        <AnimatePresence>
          {extraGuests.map((guest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 border-b border-[#6b1f2b]/10 pb-4"
            >
              <input
                value={guest.name}
                onChange={(e) => updateExtraGuest(index, "name", e.target.value)}
                placeholder="Nume invitat"
                className="w-full border-b border-[#6b1f2b]/20 bg-transparent py-2 text-[#6b1f2b] outline-none"
              />

              <div className="flex items-center justify-between">
                <select
                  title="dietary"
                  value={guest.dietary || "none"}
                  onChange={(e) => updateExtraGuest(index, "dietary", e.target.value)}
                  className="border-b border-[#6b1f2b]/20 bg-transparent text-sm text-[#6b1f2b]/70 outline-none"
                >
                  <option value="none">Fără restricții</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Fără gluten</option>
                  <option value="other">Altceva</option>
                </select>

                <button onClick={() => removeExtraGuest(index)} className="text-xs text-red-500">
                  Șterge
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ADD BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={addExtraGuest}
            disabled={!canAddMore}
            className={cn(
              "border px-6 py-2 text-sm uppercase tracking-widest transition",
              canAddMore
                ? "border-[#c9a46c] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white"
                : "cursor-not-allowed border-[#6b1f2b]/20 text-[#6b1f2b]/30",
            )}
          >
            + Adaugă invitat
          </button>
        </div>
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
