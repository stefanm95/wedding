import { submitRsvp } from "@/services/submitRsvp";
import type { RSVPFormData, RSVPStatus } from "@/types/rsvp";

export type Step =
  | "welcome"
  | "name"
  | "guests"
  | "transport"
  | "message"
  | "success"
  | "submitting"
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
  },

  transport: {
    next: () => "message",
    prev: "guests",
  },

  message: {
    next: () => "success",
    prev: "transport",
  },
  // 🔥 AICI SE ÎNTÂMPLĂ MAGIA
  success: {
    next: () => "submitting",
  },
  submitting: {
    next: () => "done",

    onEnter: async (form) => {
      await submitRsvp({
        groupId: form.groupId!,
        guests: form.guests,
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
