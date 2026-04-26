import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { StepWelcome } from "./StepWelcome";
import StepName from "./StepName";
import StepGuests from "./StepGuests";
import StepRegret from "./StepRegret";
import StepTransport from "./StepTransport";
import StepMessage from "./StepMessage";
import StepSuccess from "./StepSuccess";

import type { RSVPFormData } from "../../../types/rsvp";
import { defaultRSVP } from "../../../types/rsvp";

import { transition, getPrevStep, type Step } from "../../../utils/rsvpMachine";

type Props = {
  open: boolean;
  onClose: () => void;
};

type StepRendererProps = {
  step: Step;
  setStep: (step: Step) => void;
  form: RSVPFormData;
  setForm: React.Dispatch<React.SetStateAction<RSVPFormData>>;
};

/* 🔥 STEP RENDERER */
function StepRenderer({ step, setStep, form, setForm }: StepRendererProps) {
  switch (step) {
    case "welcome":
      return (
        <StepWelcome
          onNext={async (attending) => {
            const updatedForm: RSVPFormData = {
              ...form,
              attending,
              guests:
                attending === "yes"
                  ? form.guests.length > 0
                    ? form.guests
                    : [{ name: "", dietary: "none" }]
                  : [],
            };

            setForm(updatedForm);

            const next = await transition("welcome", updatedForm, {
              attending,
            });

            setStep(next);
          }}
        />
      );

    case "name":
      return (
        <StepName
          value={form.name}
          onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          onNext={async () => {
            const next = await transition("name", form);
            setStep(next);
          }}
          onBack={() => setStep(getPrevStep("name")!)}
        />
      );

    case "guests":
      return (
        <StepGuests
          guests={form.guests}
          onChange={(guests) => setForm((prev) => ({ ...prev, guests }))}
          onNext={async () => {
            const next = await transition("guests", form);
            setStep(next);
          }}
          onBack={() => setStep(getPrevStep("guests")!)}
        />
      );

    case "regret":
      return (
        <StepRegret
          onClose={async () => {
            const next = await transition("regret", form);
            setStep(next);
          }}
        />
      );

    case "transport":
      return (
        <StepTransport
          value={form.transport!}
          onChange={(transport) => setForm((prev) => ({ ...prev, transport }))}
          onNext={async () => {
            const next = await transition("transport", form);
            setStep(next);
          }}
          onBack={() => setStep(getPrevStep("transport")!)}
        />
      );

    case "message":
      return (
        <StepMessage
          value={form.message || ""}
          onChange={(message) => setForm((prev) => ({ ...prev, message }))}
          onNext={async () => {
            const next = await transition("message", form);
            setStep(next);
          }}
          onBack={() => setStep(getPrevStep("message")!)}
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

  const handleClose = () => {
    setStep("welcome");
    setForm(defaultRSVP);
    onClose();
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
        <AnimatePresence mode='sync'>
          <StepRenderer
            key={step}
            step={step}
            setStep={setStep}
            form={form}
            setForm={setForm}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
