import type { RSVPTransport, TransportType } from "@/types/rsvp";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  value: RSVPTransport;
  maxGuests: number;
  onChange: (val: RSVPTransport) => void;
  onNext: () => void;
  onBack: () => void;
};

const OPTIONS: { label: string; value: TransportType }[] = [
  { label: "Nu avem nevoie", value: "none" },
  { label: "Transport organizat", value: "bus" },
  { label: "Venim cu mașina", value: "personal" },
];

export default function StepTransport({ value, maxGuests, onChange, onNext, onBack }: Props) {
  const isSelected = (type: TransportType) => value?.type === type;

  const safeCount = Math.max(maxGuests, 1);

  const hasSelection = value.seatsRequested !== undefined;

  const isValid = value.type !== "bus" || hasSelection;

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

        <h2 className="script-cormorant-display text-[34px] text-[#3d2b1f]">
          Cum ajungi la eveniment?
        </h2>

        <p className="mx-auto max-w-[420px] text-[15px] text-[#3d2b1f]/75">
          Pentru a ne organiza mai bine, spune-ne cum plănuiești să ajungi.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="space-y-4 pt-6">
        {OPTIONS.map((opt) => (
          <div key={opt.value}>
            <button
              onClick={() => {
                if (opt.value === "bus") {
                  onChange({
                    type: "bus",
                    seatsRequested: undefined, // 🔥 user trebuie să aleagă
                  });
                } else {
                  onChange({ type: opt.value });
                }
              }}
              className={cn(
                rsvpStyles.option,
                "text-center",
                isSelected(opt.value)
                  ? "border-[#c9a46c] bg-white/25 text-[#3d2b1f]"
                  : "border-[#6b1f2b]/15",
              )}
            >
              {opt.label}
            </button>

            {/* BUS INFO */}
            {opt.value === "bus" && isSelected("bus") && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4 border-l border-[#c9a46c] pl-4">
                  {/* TEXT */}
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#6b1f2b]/60">
                      Detalii transport
                    </p>

                    <p className="mt-2 text-[14px] text-[#3d2b1f]/80">
                      Plecarea va avea loc din <strong>Piața Unirii</strong> la ora{" "}
                      <strong>15:30</strong>.
                    </p>

                    <p className="mt-1 text-[14px] text-[#3d2b1f]/70">
                      Te rugăm să fii acolo cu 10 minute înainte.
                    </p>
                  </div>

                  {/* SELECTOR */}
                  <div className="pt-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#6b1f2b]/60">
                      Câte persoane vor folosi transportul?
                    </p>

                    <p className="mt-1 text-[12px] text-[#3d2b1f]/60">
                      Poți selecta până la {maxGuests} persoane
                    </p>

                    {/* 🔴 dacă NU e selectat nimic */}
                    {value.seatsRequested === undefined && (
                      <p className="mt-2 text-[12px] text-[#6b1f2b]/70">
                        Alege numărul de persoane
                      </p>
                    )}

                    {/* 🔥 SELECTOR REAL */}
                    <div className="mt-3 grid grid-cols-4 gap-2 bg-red-200">
                      {Array.from({ length: safeCount }, (_, i) => i + 1).map((n) => {
                        const selected = value.seatsRequested === n;

                        return (
                          <button
                            key={n}
                            onClick={() =>
                              onChange({
                                type: "bus",
                                seatsRequested: n,
                              })
                            }
                            className={cn(
                              "rounded-sm border py-2 text-sm transition-all",

                              selected
                                ? "border-[#c9a46c] bg-[#fdf7ed] text-[#3d2b1f] shadow-sm"
                                : "border-[#6b1f2b]/15 text-[#3d2b1f]/70 hover:bg-white/20",
                            )}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>

                    {/* 🔥 FEEDBACK */}
                    {value.seatsRequested !== undefined && (
                      <p className="mt-2 text-[12px] text-[#3d2b1f]/70">
                        {value.seatsRequested}{" "}
                        {value.seatsRequested === 1 ? "persoană va folosi" : "persoane vor folosi"}{" "}
                        transportul
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
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
