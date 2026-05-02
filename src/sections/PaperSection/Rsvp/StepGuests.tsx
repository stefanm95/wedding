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
      className={rsvpStyles.step}
    >
      <button onClick={onBack} className={rsvpStyles.backButton}>
        Înapoi
      </button>

      {/* HEADER */}
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Participanți</p>
        <h2 className={rsvpStyles.title}>Confirmați participanții</h2>

        <p className={rsvpStyles.body}>
          {confirmedCount} confirmați · mai puteți adăuga {remaining} invitați
        </p>
      </div>

      {/* MEMBERS */}
      <div className="space-y-5">
        {guests.map((guest, index) => (
          <div key={index} className="space-y-4 border-b border-[#6b1f2b]/10 pb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[16px] text-[#3d2b1f]">{guest.name}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleAttending(index, true)}
                  className={cn(
                    "border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition",
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
                    "border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition",
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
                className={rsvpStyles.select}
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
      <div className="space-y-4 pt-2">
        <h3 className={rsvpStyles.label}>Invitați suplimentari</h3>

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
                className={rsvpStyles.input}
              />

              <div className="flex items-center justify-between gap-4">
                <select
                  title="dietary"
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
                  className="text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/50 transition hover:text-[#6b1f2b]"
                >
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
              rsvpStyles.secondaryButton,
              canAddMore
                ? "border-[#c9a46c]"
                : `${rsvpStyles.disabledButton} hover:bg-transparent hover:text-[#6b1f2b]/30`,
            )}
          >
            + Adaugă invitat
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(
            rsvpStyles.primaryButton,
            isValid
              ? "border-[#c9a46c]"
              : `${rsvpStyles.disabledButton} hover:bg-transparent hover:text-[#6b1f2b]/30`,
          )}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
