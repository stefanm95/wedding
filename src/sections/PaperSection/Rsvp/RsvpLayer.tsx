/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import StepConfirm from "./StepConfirm";
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
import { getMemberId, getMemberName, toGuestId } from "@utils/rsvpValidation";
import { stepVariants } from "./stepVariants";

type Props = {
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
  onSelectGroup: (group: GuestGroup) => Promise<void>;
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
          onNext={onNext}
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
          onChange={(transport) =>
            setForm((prev) => ({
              ...prev,
              transport,
            }))
          }
          onNext={onNext}
          onBack={onBack}
        />
      );

    case "message":
      return (
        <StepMessage
          value={form.message || ""}
          onChange={(message) =>
            setForm((prev) => ({
              ...prev,
              message,
            }))
          }
          onNext={onNext}
          onBack={onBack}
        />
      );

    case "confirm":
      return <StepConfirm form={form} onNext={onNext} onBack={onBack} />;

    case "success":
      return <StepSuccess />;

    case "done":
      return null;

    default:
      return null;
  }
}

export default function RsvpLayer({ onClose }: Props) {
  const [step, setStep] = useState<Step>("welcome");
  const [form, setForm] = useState<RSVPFormData>(defaultRSVP);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
        transport: rsvp.transport || { type: "none" },
        name: "",
        attending: true,
      });

      setStep("guests");
    } else {
      setForm((prev) => ({
        ...prev,
        groupId: group.id,
        guests: group.members.map((member) => {
          const name = getMemberName(member);

          return {
            id: getMemberId(member),
            name,
            attending: true,
            dietary: "none",
          };
        }),
        extraGuests: [],
        maxGuests: group.maxGuests,
      }));
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleNext = async (ctx?: { attending?: RSVPStatus }) => {
    if (isTransitioning) return;

    setDirection(1);
    setIsTransitioning(true);

    try {
      const next = await transition(step, form, ctx);
      setStep(next);
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleBack = () => {
    const prev = getPrevStep(step);
    if (!prev) return;

    setDirection(-1);
    setStep(prev);
  };

  const handleClose = () => {
    setStep("welcome");
    setForm(defaultRSVP);
    onClose();
  };

  /* ---------------- AUTO CLOSE ---------------- */

  useEffect(() => {
    if (step === "done") {
      const t = setTimeout(handleClose, 100); // 🔥 faster close
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(async () => {
        const next = await transition("success", form);
        setStep(next);
      }, 1200); // let success breathe

      return () => clearTimeout(t);
    }
  }, [step]);

  /* ---------------- ESC ---------------- */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div className="absolute inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pb-24 pt-24 md:pt-32">
      {/* BACKDROP */}
      <motion.div
        onClick={handleClose}
        className="absolute inset-0 bg-[#f4f1ea]/80 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* PAPER LAYER */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.98, rotate: -0.4 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: -0.4 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[640px] border border-black/5 bg-[#f4f1ea] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.15)] md:p-12"
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          aria-label="Inchide RSVP"
          className="absolute right-6 top-6 text-[#6b1f2b]/60 transition hover:text-[#6b1f2b]"
        >
          ✕
        </button>

        {/* STEPS */}
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
      </motion.div>
    </div>
  );
}
