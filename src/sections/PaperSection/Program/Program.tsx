import { useState } from "react";
import RsvpModal from "@paper/Rsvp/RsvpModal";
import { programData } from "./programData";
import ProgramItem from "./ProgramItem";

export default function Program() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen items-center">
        <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-16">
          {/* 🔥 RSVP TOP RIGHT */}
          <div className="absolute right-6 top-6 md:right-16 md:top-10">
            <button
              onClick={() => setOpen(true)}
              className="group relative border border-[#c9a46c] px-8 py-3 text-[12px] uppercase tracking-[0.25em] text-[#6b1f2b] transition-all duration-300 hover:bg-[#6b1f2b] hover:text-white"
            >
              Confirmă prezența
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a46c]/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          </div>

          {/* HEADER */}
          <div className="mb-10 text-center md:text-left">
            <h2
              className="script-cormorant-display text-[32px] tracking-[0.15em] text-[#6b1f2b] md:text-[40px]"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.2)" }}
            >
              PROGRAMUL ZILEI
            </h2>

            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
              <div className="h-[1px] w-14 bg-[#c9a46c]" />
              <div className="h-2 w-2 rotate-45 bg-[#c9a46c]" />
              <div className="h-[1px] w-14 bg-[#c9a46c]" />
            </div>
          </div>

          {/* 🔥 MAIN */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* LEFT → TIMELINE */}
            <div className="relative pl-10">
              {/* vertical line */}
              <div className="absolute bottom-2 left-[18px] top-2 w-[1px] bg-[#6b1f2b]/20" />

              <div className="space-y-8">
                {programData.map((item, index) => (
                  <ProgramItem key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
