import type { DietaryOption, RSVPGuest, RSVPStatus } from "@/types/rsvp";
import { toGuestId } from "@/utils/rsvpValidation";
import { cn } from "@utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
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
      className={`${rsvpStyles.step} relative pt-8`}
    >
      {/* 🔙 BACK (floating) */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* ✨ HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Participare</p>

        <h2 className="script-cormorant-display text-[34px] leading-tight text-[#3d2b1f]">
          Cu cine vei fi alături de noi?
        </h2>

        <p className="text-[15px] text-[#3d2b1f]/75">
          {confirmedCount > 0
            ? `${confirmedCount} confirmați · mai puteți adăuga ${remaining}`
            : "Alege cine va participa"}
        </p>
      </div>

      {/* ✨ MEMBERS */}
      <div className="space-y-6 pt-6">
        {guests.map((guest, index) => (
          <div key={guest.id} className="space-y-4 border-b border-[#6b1f2b]/10 pb-5">
            {/* NAME + TOGGLE */}
            <div className="flex items-center justify-between">
              <span className="text-[17px] text-[#3d2b1f]">{guest.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAttending(index, true)}
                  className={cn(
                    "border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition",
                    guest.attending
                      ? "border-[#6b1f2b] bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  +
                </button>

                <button
                  onClick={() => toggleAttending(index, false)}
                  className={cn(
                    "border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition",
                    !guest.attending
                      ? "border-[#6b1f2b] bg-[#6b1f2b] text-white"
                      : "border-[#6b1f2b]/30 text-[#6b1f2b]/60",
                  )}
                >
                  -
                </button>
              </div>
            </div>

            {/* DIETARY */}
            {guest.attending && (
              <div className="pt-1">
                <select
                  value={guest.dietary || "none"}
                  onChange={(e) => updateDietary(index, e.target.value as DietaryOption)}
                  className={rsvpStyles.select}
                >
                  <option value="none">Fără restricții</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Fără gluten</option>
                  <option value="other">Altceva</option>
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✨ EXTRA GUESTS */}
      <div className="space-y-5 pt-6">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#6b1f2b]/50">
            Invitați suplimentari
          </p>
        </div>

        <AnimatePresence>
          {extraGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3 border-b border-[#6b1f2b]/10 pb-4"
            >
              <input
                value={guest.name}
                onChange={(e) => updateExtraGuest(index, "name", e.target.value)}
                placeholder="Nume invitat"
                className={rsvpStyles.input}
              />

              <div className="flex items-center justify-between gap-4">
                <select
                  value={guest.dietary || "none"}
                  onChange={(e) => updateExtraGuest(index, "dietary", e.target.value)}
                  className={rsvpStyles.select}
                >
                  <option value="none">Fără restricții</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Fără gluten</option>
                  <option value="other">Altceva</option>
                </select>

                <button
                  onClick={() => removeExtraGuest(index)}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/50 hover:text-[#6b1f2b]"
                >
                  Șterge
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ADD */}
        <div className="flex justify-center pt-2">
          <button
            onClick={addExtraGuest}
            disabled={!canAddMore}
            className={cn(rsvpStyles.secondaryButton, !canAddMore && rsvpStyles.disabledButton)}
          >
            + Adaugă persoană
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(rsvpStyles.primaryButton, !isValid && rsvpStyles.disabledButton)}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
