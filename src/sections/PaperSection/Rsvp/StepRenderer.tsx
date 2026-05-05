import StepConfirm from "./StepConfirm";
import StepGuests from "./StepGuests";
import StepMessage from "./StepMessage";
import StepName from "./StepName";
import StepRegret from "./StepRegret";
import StepSuccess from "./StepSuccess";
import StepTransport from "./StepTransport";
import { StepWelcome } from "./StepWelcome";

import type { RSVPFormData } from "@/types/rsvp";

export default function StepRenderer({ step, onBack, onNext, form, setForm, onSelectGroup }: any) {
  switch (step) {
    case "welcome":
      return <StepWelcome onNext={onNext} />;

    case "name":
      return (
        <StepName
          value={form.groupId}
          onSelectGroup={onSelectGroup}
          onConfirm={(attending: boolean) => onNext({ attending })}
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
            setForm((prev: RSVPFormData) => ({
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
          value={form.transport}
          maxGuests={form.maxGuests}
          onChange={(transport) =>
            setForm((prev: RSVPFormData) => ({
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
            setForm((prev: RSVPFormData) => ({
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

    default:
      return null;
  }
}
