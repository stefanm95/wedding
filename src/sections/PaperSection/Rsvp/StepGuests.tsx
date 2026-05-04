import type { DietaryOption, RSVPGuest, RSVPStatus } from "@/types/rsvp";
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

/* ---------------- ANIMATIONS ---------------- */

const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
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

  /* ---------------- EXTRA ---------------- */

  const addExtraGuest = () => {
    onChange(guests, [
      ...extraGuests,
      {
        id: `extra-${Date.now()}`, // ✅ rămâne stabil
        name: "",
        attending: true,
        dietary: "none",
      },
    ]);
  };

  const updateExtraGuest = (index: number, field: keyof RSVPGuest, value: any) => {
    const updated = [...extraGuests];
    const nextGuest = { ...updated[index], [field]: value };

    updated[index] = nextGuest;
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
      {/* BACK */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Participare</p>

        <h2 className="script-cormorant-display text-[34px] leading-tight text-[#3d2b1f]">
          Cu cine vei fi alături de noi?
        </h2>

        <p className="text-[15px] text-[#3d2b1f]/75">
          {confirmedCount > 0
            ? `${confirmedCount} persoane vor fi alături de noi`
            : "Spune-ne cine va participa"}
        </p>
      </div>

      {/* DIVIDER */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
        <div className="h-2 w-2 rotate-45 bg-[#c9a46c]/60" />
        <div className="h-[1px] w-10 bg-[#c9a46c]/60" />
      </div>

      {/* MEMBERS */}
      <motion.div
        variants={listVariants}
        initial="initial"
        animate="animate"
        className="space-y-5 pt-6 will-change-transform"
      >
        {guests.map((guest, index) => (
          <motion.div
            key={guest.id}
            variants={itemVariants}
            layout
            whileHover={{ scale: 1.01 }}
            onClick={() => toggleAttending(index, !guest.attending)}
            className={cn(
              "relative cursor-pointer rounded-sm border px-5 py-5 transition-all duration-500",
              guest.attending
                ? "border-[#c9a46c]/50 bg-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                : "border-[#6b1f2b]/10 hover:bg-white/15",
            )}
          >
            {/* ✍️ INK BLOOM */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={guest.attending ? { scale: 1.4, opacity: 0.12 } : { scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#6b1f2b_0%,transparent_70%)]"
            />

            <motion.img
              src="/assets/crest/crest-drop.png"
              alt=""
              initial={{ opacity: 0 }}
              animate={guest.attending ? { opacity: 0.06 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute right-4 top-4 h-20 w-20 object-contain"
            />

            {/* CONTENT */}
            <div className="relative z-10 flex items-center justify-between">
              {/* LEFT */}
              <div>
                <span className="text-[17px] text-[#3d2b1f]">{guest.name}</span>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6b1f2b]/40">
                  {guest.attending ? "prezent" : "atinge"}
                </span>

                {/* CHECK */}
                <div className="relative h-8 w-8">
                  <AnimatePresence>
                    {guest.attending && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: -6 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full"
                      >
                        {/* CREST SEAL */}
                        <div className="relative h-10 w-10">
                          <AnimatePresence>
                            {guest.attending && (
                              <motion.img
                                src="/assets/crest/crest-drop.png"
                                alt="confirmed"
                                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                                animate={{ opacity: 0.85, scale: 1, rotate: -4 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full object-contain"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* DIETARY */}
            <AnimatePresence>
              {guest.attending && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="pt-3"
                >
                  <select
                    title="dietary"
                    value={guest.dietary || "none"}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateDietary(index, e.target.value as DietaryOption)}
                    className={rsvpStyles.select}
                  >
                    <option value="none">Fără restricții</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Fără gluten</option>
                    <option value="other">Altceva</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* EXTRA */}
      <div className="pt-10">
        <div className="border-t border-[#6b1f2b]/10 pt-6 text-center">
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
              className="mt-4 space-y-3 rounded-sm border border-[#6b1f2b]/10 bg-white/10 px-4 py-4"
            >
              <input
                value={guest.name}
                onChange={(e) => updateExtraGuest(index, "name", e.target.value)}
                placeholder="Nume invitat"
                className={cn(rsvpStyles.input, "text-center")}
                onClick={(e) => e.stopPropagation()}
              />

              <div className="flex items-center justify-between gap-4">
                <select
                  title="dietary options"
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

        <div className="flex justify-center pt-4">
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
