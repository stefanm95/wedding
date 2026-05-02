import { useState } from "react";
import RsvpModal from "@paper/Rsvp/RsvpModal";
import { programData } from "./programData";
import ProgramItem from "./ProgramItem";

export default function Program() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen pt-16 md:pt-20 xl:pt-28">
        <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-6 md:px-12">
          {/* HEADER */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="script-cormorant-display text-[30px] tracking-[0.08em] text-[#6b1f2b] sm:text-[34px] md:text-[40px]">
                PROGRAMUL ZILEI
              </h2>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-[1px] w-10 bg-[#c9a46c]" />
                <div className="h-2 w-2 rotate-45 bg-[#c9a46c]" />
                <div className="h-[1px] w-10 bg-[#c9a46c]" />
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="self-start border border-[#c9a46c] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white sm:text-[11px]"
            >
              Confirmă prezența
            </button>
          </div>

          {/* ========================= */}
          {/* 🖥 + 📱 TABLET (same logic) */}
          {/* ========================= */}
          <div className="relative mt-24 hidden h-[720px] md:block">
            {programData.map((item, index) => (
              <ProgramItem key={index} item={item} index={index} variant="cinematic" />
            ))}
          </div>

          {/* ========================= */}
          {/* 📱 MOBILE */}
          {/* ========================= */}
          <div className="relative mt-12 space-y-10 pl-8 md:hidden">
            <div className="absolute bottom-0 left-[12px] top-0 w-[1px] bg-[#6b1f2b]/20" />

            {programData.map((item, index) => (
              <ProgramItem key={index} item={item} index={index} variant="mobile" />
            ))}
          </div>
        </div>
      </section>

      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
