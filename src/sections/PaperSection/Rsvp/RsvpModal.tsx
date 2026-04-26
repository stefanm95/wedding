import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { StepWelcome } from "./StepWelcome";
import StepName from "./StepName";
import StepGuests from "./StepGuests";
import StepRegret from "./StepRegret";
import StepTransport from "./StepTransport";
import StepMessage from "./StepMessage";
import StepSuccess from "./StepSuccess";

import type { RSVPFormData, RSVPStatus } from "../../../types/rsvp";
import { defaultRSVP } from "../../../types/rsvp";

import { transition, getPrevStep, type Step } from "../../../utils/rsvpMachine";
import { stepVariants } from "./stepVariants";

type Props = {
  open: boolean;
  onClose: () => void;
};

type NextContext = {
  attending?: RSVPStatus;
};

type StepRendererProps = {
  step: Step;
  onNext: (ctx?: NextContext) => void;
  onBack: () => void;
  form: RSVPFormData;
  setForm: React.Dispatch<React.SetStateAction<RSVPFormData>>;
};

/* 🔥 STEP RENDERER */
function StepRenderer({
  step,
  onBack,
  onNext,
  form,
  setForm,
}: StepRendererProps) {
  switch (step) {
    case "welcome":
      return (
        <StepWelcome
          onNext={(attending) => {
            const updatedForm = {
              ...form,
              attending,
              guests:
                attending === "yes"
                  ? form.guests.length > 0
                    ? form.guests
                    : [{ name: "", dietary: "none" as const }]
                  : [],
            };

            setForm(updatedForm);

            onNext({ attending }); // 🔥 direct, fără lag
          }}
        />
      );

    case "name":
      return (
        <StepName
          value={form.name}
          onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          onNext={onNext} // 🔥 nu mai face transition aici
          onBack={onBack}
        />
      );

    case "guests":
      return (
        <StepGuests
          guests={form.guests}
          onChange={(guests) => setForm((prev) => ({ ...prev, guests }))}
          onNext={onNext} // 🔥 nu mai face transition aici
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

  const handleClose = () => {
    setStep("welcome");
    setForm(defaultRSVP);
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
    if (step === "success") {
      const t = setTimeout(async () => {
        const next = await transition("success", form);
        setStep(next);
      }, 2000);

      return () => clearTimeout(t);
    }
  }, [step]);

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
    <div className='fixed inset-0 z-[999] flex items-center justify-center'>
      {/* BACKDROP */}
      <div
        onClick={handleClose}
        className='absolute inset-0 bg-black/40 backdrop-blur-md'
      />

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className='
          relative z-10
          w-full max-w-[640px]
          mx-4
          p-10
          bg-[#f4f1ea]
          shadow-[0_40px_120px_rgba(0,0,0,0.25)]
        '
      >
        {/* CLOSE */}
        <button
          onClick={handleClose}
          className='absolute top-6 right-6 text-[#6b1f2b]/60 hover:text-[#6b1f2b]'
        >
          ✕
        </button>

        {/* STEPS */}
        <AnimatePresence mode='wait' custom={direction} initial={false}>
          <motion.div
            key={step}
            variants={stepVariants}
            custom={direction}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <StepRenderer
              step={step}
              onNext={handleNext}
              onBack={handleBack}
              form={form}
              setForm={setForm}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
