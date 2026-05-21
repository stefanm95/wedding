import { db } from "@/lib/firebase";
import { submitRsvp } from "@/services/submitRsvp";
import type { RSVPFormData, RSVPStatus } from "@/types/rsvp";
import {
  getMemberId,
  getMemberName,
  validateGuests,
  validateRsvpForm,
  validateSelectedGroup,
} from "@/utils/rsvpValidation";
import { doc, getDoc } from "firebase/firestore";

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
    next: () => "name",
  },

  name: {
    next: (ctx) => (ctx?.attending === false ? "regret" : "guests"),
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
      });
    },
  },

  regret: {
    next: () => "done",
    prev: "name",

    onEnter: async (form) => {
      // 🔥 fetch group again (source of truth)
      const groupRef = doc(db, "guestGroups", form.groupId);
      const groupSnap = await getDoc(groupRef);

      if (!groupSnap.exists()) {
        throw new Error("Grup inexistent");
      }

      const group = groupSnap.data();

      const guests = (group.members || []).map((member: any) => ({
        id: getMemberId(member),
        name: getMemberName(member),
        attending: false,
        dietary: "none",
      }));

      await submitRsvp({
        groupId: form.groupId,
        guests,
        extraGuests: [],
        message: "declined",
      });
    },
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
    alert("Eroare la trimitere RSVP"); // or toast
    return current;
  }

  return next;
};

// 🔙 back helper
export const getPrevStep = (step: Step): Step | undefined => {
  return rsvpMachine[step].prev;
};
