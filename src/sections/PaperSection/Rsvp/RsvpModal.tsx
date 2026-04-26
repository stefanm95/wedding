import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StepWelcome } from "./StepWelcome";
import type { RSVPFormData } from "../../../types/rsvp"; // sau unde l-ai pus
import { defaultRSVP } from "../../../types/rsvp";
import StepName from "./StepName";

type Props = {
  open: boolean;
  onClose: () => void;
};
type StepRendererProps = {
  step: number;
  setStep: (n: number) => void;
  form: RSVPFormData;
  setForm: React.Dispatch<React.SetStateAction<RSVPFormData>>;
};

function StepRenderer({ step, setStep, form, setForm }: StepRendererProps) {
  switch (step) {
    case 0:
      return (
        <StepWelcome
          onNext={(attending) => {
            setForm((prev: RSVPFormData) => ({
              ...prev,
              attending,
            }));
            setStep(1);
          }}
        />
      );

    case 1:
      return (
        <StepName
          value={form.name}
          onChange={(value) =>
            setForm((prev: RSVPFormData) => ({
              ...prev,
              name: value,
            }))
          }
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      );

    default:
      return null;
  }
}

export default function RsvpModal({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RSVPFormData>(defaultRSVP);

  const handleClose = () => {
    setStep(0);
    setForm(defaultRSVP);
    onClose();
  };

  // 🔐 ESC close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (open) {
      document.addEventListener("keydown", handleKey);
    }

    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // ❌ nu randăm dacă nu e deschis
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center'>
      {/* 🌫 BACKDROP */}
      <div
        onClick={handleClose}
        className='
          absolute inset-0
          bg-black/40
          backdrop-blur-md
        '
      />

      {/* 📄 MODAL */}
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
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className='absolute top-6 right-6 text-[#6b1f2b]/60 hover:text-[#6b1f2b]'
        >
          ✕
        </button>

        {/* 🔥 STEP CONTENT */}
        <AnimatePresence mode='wait'>
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
