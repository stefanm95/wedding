/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { GuestGroup, RSVPFormData, RSVPStatus } from "@/types/rsvp";
import { defaultRSVP } from "@/types/rsvp";

import { getPrevStep, transition, type Step } from "@utils/rsvpMachine";
import { getMemberId, getMemberName, toGuestId } from "@utils/rsvpValidation";
import { stepVariants } from "./stepVariants";
import StepRenderer from "./StepRenderer";
import PaperGrain from "@/components/PaperGrain";
import PeonyEmboss from "/assets/art/bujorr.png";

type Props = {
  onComplete?: () => void; // 🔥 înlocuiește onClose
};

export default function RsvpLayerInline({ onComplete }: Props) {
  const [step, setStep] = useState<Step>("welcome");
  const [form, setForm] = useState<RSVPFormData>(defaultRSVP);
  const [direction, setDirection] = useState(1);
  const lockRef = useRef(false);

  /* ---------------- SELECT GROUP ---------------- */

  const handleSelectGroup = async (group: GuestGroup) => {
    const rsvpRef = doc(db, "rsvps", group.id);
    const rsvpSnap = await getDoc(rsvpRef);

    if (rsvpSnap.exists()) {
      const rsvp = rsvpSnap.data();

      setForm({
        groupId: group.id,
        guests: (rsvp.guests || []).map((guest: any) => ({
          ...guest,
          id: guest.id || toGuestId(guest.name || ""),
        })),
        extraGuests: (rsvp.extraGuests || []).map((guest: any) => ({
          ...guest,
          id: guest.id || `extra-${toGuestId(guest.name || "")}`,
        })),
        maxGuests: group.maxGuests,
        message: rsvp.message || "",
        transport: rsvp.transport ?? { type: "none" },
        name: "",
        attending: true,
      });

      setStep("guests");
    } else {
      setForm((prev) => ({
        ...prev,
        groupId: group.id,
        guests: group.members.map((member) => ({
          id: getMemberId(member),
          name: getMemberName(member),
          attending: true,
          dietary: "none",
        })),
        extraGuests: [],
        maxGuests: group.maxGuests,
      }));
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleNext = async (ctx?: { attending?: RSVPStatus }) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setDirection(1);

    try {
      const next = await transition(step, form, ctx);

      if (import.meta.env.DEV) {
        console.log("RSVP transition:", { from: step, to: next, form, ctx });
      }

      setStep(next);
    } finally {
      lockRef.current = false;
    }
  };

  const handleBack = () => {
    const prev = getPrevStep(step);
    if (!prev) return;

    setDirection(-1);
    setStep(prev);
  };

  /* ---------------- AUTO COMPLETE ---------------- */

  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(async () => {
        const next = await transition("success", form);
        setStep(next);
      }, 1200);

      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (step === "done") {
      onComplete?.(); // 🔥 nu mai închizi modal
    }
  }, [step]);

  /* ---------------- UI ---------------- */

  return (
    <section id="rsvp" className="relative flex w-full justify-center px-4 py-32">
      {/* 🌸 PEONY EMBOSS (background decorative) */}
      <div className="pointer-events-none absolute right-[2%] z-0 opacity-40 md:-right-[10%] md:top-[20%] lg:right-[2%] lg:top-[2%]">
        <img
          src={PeonyEmboss}
          alt="peonyemboss"
          className="w-[360px] select-none object-contain md:w-[340px] lg:w-[520px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[640px] border border-black/5 bg-[#f4f1ea]/70 px-8 py-12 md:px-12 md:py-16"
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step !== "done" && (
            <motion.div
              key={step}
              variants={stepVariants}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <StepRenderer
                step={step}
                onNext={handleNext}
                onBack={handleBack}
                form={form}
                setForm={setForm}
                onSelectGroup={handleSelectGroup}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <PaperGrain />
      </motion.div>
    </section>
  );
}
