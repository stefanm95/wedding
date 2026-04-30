import { submitRsvp } from "@/services/submitRsvp";
import type { RSVPFormData, RSVPStatus } from "@/types/rsvp";
import { validateGuests, validateRsvpForm, validateSelectedGroup } from "@/utils/rsvpValidation";

export type Step =
  | "welcome"
  | "name"
  | "guests"
  | "transport"
  | "message"
  | "confirm"
  | "success"
  | "regret"
  | "done";

type Context = {
  attending?: RSVPStatus;
};

type StateConfig = {
  next: (ctx?: Context) => Step;
  prev?: Step;

  // 🔥 extensii
  canEnter?: (form: RSVPFormData) => boolean;
  onEnter?: (form: RSVPFormData) => void | Promise<void>;
};

export const rsvpMachine: Record<Step, StateConfig> = {
  welcome: {
    next: (ctx) => (ctx?.attending === false ? "regret" : "name"),
  },

  name: {
    next: () => "guests",
    prev: "welcome",
  },

  guests: {
    next: () => "transport",
    prev: "name",
    canEnter: (form) => validateSelectedGroup(form).ok,
  },

  transport: {
    next: () => "message",
    prev: "guests",
    canEnter: (form) => validateGuests(form).ok,
  },

  message: {
    next: () => "confirm",
    prev: "transport",
  },

  confirm: {
    next: () => "success",
    prev: "message",
    canEnter: (form) => validateRsvpForm(form).ok,
  },
  // 🔥 AICI SE ÎNTÂMPLĂ MAGIA
  success: {
    next: () => "done",

    canEnter: (form) => validateRsvpForm(form).ok,

    onEnter: async (form) => {
      await submitRsvp({
        groupId: form.groupId,
        guests: form.guests,
        extraGuests: form.extraGuests,
        message: form.message,
        transport: form.transport,
      });
    },
  },

  regret: {
    next: () => "done",
    prev: "welcome",
  },

  done: {
    next: () => "done",
  },
};

// 🔥 helper principal
export const transition = async (
  current: Step,
  form: RSVPFormData,
  ctx?: Context,
): Promise<Step> => {
  const next = rsvpMachine[current].next(ctx);
  const nextState = rsvpMachine[next];

  if (nextState.canEnter && !nextState.canEnter(form)) {
    return current;
  }

  try {
    if (nextState.onEnter) {
      await nextState.onEnter(form);
    }
  } catch (err) {
    console.error("RSVP submit failed:", err);

    return current; // 🔥 rămâi în message
  }

  return next;
};

// 🔙 back helper
export const getPrevStep = (step: Step): Step | undefined => {
  return rsvpMachine[step].prev;
};
