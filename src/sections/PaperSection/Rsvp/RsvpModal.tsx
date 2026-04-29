/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import StepGuests from "./StepGuests";
import StepMessage from "./StepMessage";
import StepName from "./StepName";
import StepRegret from "./StepRegret";
import StepSuccess from "./StepSuccess";
import StepTransport from "./StepTransport";
import { StepWelcome } from "./StepWelcome";

import type { GuestGroup, RSVPFormData, RSVPStatus } from "@/types/rsvp";
import { defaultRSVP } from "@/types/rsvp";

import { getPrevStep, transition, type Step } from "@utils/rsvpMachine";
import { stepVariants } from "./stepVariants";

type Props = {
  open: boolean;
  onClose: () => void;
};

type NextContext = {
  attending?: boolean;
};

type StepRendererProps = {
  step: Step;
  onNext: (ctx?: NextContext) => void;
  onBack: () => void;
  form: RSVPFormData;
  setForm: React.Dispatch<React.SetStateAction<RSVPFormData>>;
  onSelectGroup: (group: GuestGroup) => Promise<void>; // 🔥 adaugă asta
};

/* 🔥 STEP RENDERER */
function StepRenderer({ step, onBack, onNext, form, setForm, onSelectGroup }: StepRendererProps) {
  switch (step) {
    case "welcome":
      return <StepWelcome onNext={(attending: boolean) => onNext({ attending })} />;

    case "name":
      return (
        <StepName
          value={form.groupId}
          onSelectGroup={onSelectGroup}
          onNext={onNext} // 🔥 nu mai face transition aici
          onBack={onBack}
        />
      );

    case "guests":
      return (
        <StepGuests
          guests={form.guests}
          extraGuests={form.extraGuests}
          maxGuests={form.maxGuests}
          onChange={(guests, extraGuests) =>
            setForm((prev) => ({
              ...prev,
              guests,
              extraGuests,
            }))
          }
          onNext={onNext}
          onBack={onBack}
        />
      );

    case "regret":
      return <StepRegret onClose={() => onNext()} />;

    case "transport":
      return (
        <StepTransport
          value={form.transport!}
          onChange={(transport) => setForm((prev) => ({ ...prev, transport }))}
          onNext={onNext} // 🔥 nu mai face transition aici
          onBack={onBack}
        />
      );

    case "message":
      return (
        <StepMessage
          value={form.message || ""}
          onChange={(message) => setForm((prev) => ({ ...prev, message }))}
          onNext={onNext} // 🔥 nu mai face transition aici
          onBack={onBack}
        />
      );

    case "success":
      return <StepSuccess />;

    case "submitting":
      return <div className="py-10 text-center">Se trimite RSVP...</div>;

    case "done":
      return null;

    default:
      return null;
  }
}

export default function RsvpModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>("welcome");
  const [form, setForm] = useState<RSVPFormData>(defaultRSVP);
  const [direction, setDirection] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelectGroup = async (group: GuestGroup) => {
    const rsvpRef = doc(db, "rsvps", group.id);
    const rsvpSnap = await getDoc(rsvpRef);

    if (rsvpSnap.exists()) {
      const rsvp = rsvpSnap.data();

      // 🔥 EDIT MODE
      setForm({
        groupId: group.id,
        guests: rsvp.guests || [],
        extraGuests: rsvp.extraGuests || [],
        maxGuests: group.maxGuests,
        message: rsvp.message || "",
        transport: rsvp.transport || { type: "none" },
        name: "",
        attending: true,
      });

      setStep(rsvpSnap.exists() ? "guests" : "guests");
    } else {
      // 🔥 CREATE MODE
      setForm((prev) => ({
        ...prev,
        groupId: group.id,
        guests: group.members.map((name: string) => ({
          name,
          attending: true,
          dietary: "none",
        })),
        extraGuests: [],
        maxGuests: group.maxGuests, // 🔥 HERE
      }));
    }
  };

  const handleClose = () => {
    setStep("welcome");
    setForm(defaultRSVP);
    setHasSubmitted(false);
    onClose();
  };

  const handleNext = async (ctx?: { attending?: RSVPStatus }) => {
    setDirection(1);

    const next = await transition(step, form, ctx);

    setStep(next);
  };

  const handleBack = () => {
    const prev = getPrevStep(step);

    if (!prev) return;

    setDirection(-1);
    setStep(prev);
  };

  useEffect(() => {
    if (step === "success" && !hasSubmitted) {
      const t = setTimeout(async () => {
        setHasSubmitted(true);

        const next = await transition("success", form);
        setStep(next);
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [step, hasSubmitted]);

  // 🔥 auto close după done
  useEffect(() => {
    if (step === "done") {
      const t = setTimeout(handleClose, 1500);
      return () => clearTimeout(t);
    }
  }, [step]);

  // 🔐 ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (open) {
      document.addEventListener("keydown", handleKey);
    }

    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* BACKDROP */}
      <div onClick={handleClose} className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 mx-4 w-full max-w-[640px] bg-[#f4f1ea] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-[#6b1f2b]/60 hover:text-[#6b1f2b]"
        >
          ✕
        </button>

        {/* STEPS */}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
