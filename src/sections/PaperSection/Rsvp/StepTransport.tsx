import type { GuestTransport, RSVPGuest, TransportType } from "@/types/rsvp";

import { TRANSPORT_LOCATIONS, type TransportLocationId } from "@/data/transportOptions";

import { cn } from "@utils/cn";
import { motion } from "framer-motion";

import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  guests: RSVPGuest[];
  extraGuests: RSVPGuest[];

  onChange: (guests: RSVPGuest[], extraGuests: RSVPGuest[]) => void;

  onNext: () => void;
  onBack: () => void;
};

export default function StepTransport({ guests, extraGuests, onChange, onNext, onBack }: Props) {
  const attendingGuests = [...guests, ...extraGuests].filter((g) => g.attending);

  function updateGuestTransport(guestId: string, transport: GuestTransport) {
    const updateList = (list: RSVPGuest[]) =>
      list.map((guest) =>
        guest.id === guestId
          ? {
              ...guest,
              transport,
            }
          : guest,
      );

    onChange(updateList(guests), updateList(extraGuests));
  }

  const isValid = attendingGuests.every((guest) => {
    if (!guest.transport) return false;

    if (guest.transport.type !== "bus") {
      return true;
    }

    return Boolean(guest.transport.locationId);
  });

  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} relative pt-8`}
    >
      {/* BACK */}
      <button
        onClick={onBack}
        className="absolute left-0 top-0 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/55 transition hover:text-[#6b1f2b]"
      >
        <span className="text-[14px] leading-none">←</span>
        Înapoi
      </button>

      {/* HEADER */}
      <div className="space-y-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/50">Organizare</p>

        <h2 className="script-cormorant-display text-[34px] text-[#3d2b1f]">Cum ajunge fiecare?</h2>

        <p className="mx-auto max-w-[420px] text-[15px] text-[#3d2b1f]/75">
          Ajută-ne să organizăm transportul pentru fiecare invitat.
        </p>
      </div>

      {/* GUESTS */}
      <div className="space-y-5 pt-8">
        {attendingGuests.map((guest) => {
          const transport = guest.transport;

          const selectedLocation = TRANSPORT_LOCATIONS.find(
            (location) => location.id === transport?.locationId,
          );

          return (
            <div key={guest.id} className="rounded-sm border border-[#6b1f2b]/10 bg-white/10 p-5">
              <h3 className="mb-4 text-[18px] text-[#3d2b1f]">{guest.name}</h3>

              {/* TYPE */}
              <div className="relative">
                <select
                  title="tipul transportului"
                  value={transport?.type || "none"}
                  onChange={(e) =>
                    updateGuestTransport(guest.id, {
                      type: e.target.value as TransportType,
                    })
                  }
                  className={cn(rsvpStyles.select, "w-full appearance-none pr-10")}
                >
                  <option className="bg-[#f8f4ee] text-[#3d2b1f]" value="none">
                    Nu are nevoie de transport
                  </option>

                  <option className="bg-[#f8f4ee] text-[#3d2b1f]" value="personal">
                    Vine cu mașina personală
                  </option>

                  <option className="bg-[#f8f4ee] text-[#3d2b1f]" value="bus">
                    Transport organizat
                  </option>
                </select>

                {/* custom arrow */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b1f2b]/45">
                  ↓
                </div>
              </div>

              {/* BUS */}
              {transport?.type === "bus" && (
                <div className="mt-4 space-y-4 border-l border-[#c9a46c] pl-4">
                  <div className="relative">
                    <select
                      title="locatie plecare"
                      value={transport.locationId || ""}
                      onChange={(e) =>
                        updateGuestTransport(guest.id, {
                          type: "bus",
                          locationId: e.target.value as TransportLocationId,
                        })
                      }
                      className={cn(rsvpStyles.select, "w-full appearance-none pr-10")}
                    >
                      <option className="bg-[#f8f4ee] text-[#3d2b1f]" value="">
                        Alege locația plecării
                      </option>

                      {TRANSPORT_LOCATIONS.map((location) => (
                        <option
                          key={location.id}
                          value={location.id}
                          className="bg-[#f8f4ee] text-[#3d2b1f]"
                        >
                          {location.label}
                        </option>
                      ))}
                    </select>

                    {/* custom arrow */}
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6b1f2b]/45">
                      ↓
                    </div>
                  </div>

                  {selectedLocation && (
                    <div className="space-y-2 text-[14px] text-[#3d2b1f]/80">
                      <p>
                        Plecare: <strong>{selectedLocation.departurePlace}</strong>
                      </p>

                      <p>
                        Ora: <strong>{selectedLocation.departureTime}</strong>
                      </p>

                      {selectedLocation.description && (
                        <p className="text-[#3d2b1f]/65">{selectedLocation.description}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className={rsvpStyles.actionsEnd}>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn(rsvpStyles.primaryButton, !isValid && rsvpStyles.disabledButton)}
        >
          Continuă
        </button>
      </div>
    </motion.div>
  );
}
