import { useState } from "react";
import RsvpModal from "../Rsvp/RsvpModal";
import { programData } from "./programData";
import ProgramItem from "./ProgramItem";

export default function Program() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          {/* HEADER */}
          <div>
            <h2
              className="script-cormorant-display text-[36px] tracking-[0.25em] text-[#6b1f2b] md:text-[44px]"
              style={{
                textShadow: "1px 1px 0 rgba(0,0,0,0.2)",
              }}
            >
              PROGRAMUL ZILEI
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-[1px] w-24 bg-[#c9a46c]" />
              <div className="h-2 w-2 rotate-45 bg-[#c9a46c]" />
              <div className="h-[1px] w-24 bg-[#c9a46c]" />
            </div>
          </div>

          {/* LAYOUT */}
          <div className="mt-24 grid items-start gap-16 md:mt-32 lg:grid-cols-[1fr_0.8fr]">
            {/* 🔥 TIMELINE */}
            <div className="relative pl-14">
              {/* LINE */}
              <div className="absolute bottom-2 left-[22px] top-4 w-[1px] bg-[#6b1f2b]/20" />

              <div className="space-y-16 md:space-y-20">
                {programData.map((item, index) => (
                  <ProgramItem key={index} item={item} />
                ))}
              </div>
            </div>

            {/* 🪶 DECOR (folosești asset-urile tale) */}
            <div className="hidden justify-center lg:flex">
              <div className="relative h-[420px] w-[420px] opacity-80">
                <img
                  src="/assets/paper/monogram-emboss.png"
                  alt="decor"
                  className="h-full w-full object-contain opacity-40"
                />

                <img
                  src="/assets/paper/wax-seal.png"
                  alt="seal"
                  className="absolute bottom-[-20px] right-[-10px] w-28"
                />
              </div>
            </div>
          </div>
          {/* ========================= */}
          {/* 🔥 RSVP CTA */}
          {/* ========================= */}
          <div className="mt-24 flex justify-center md:mt-32">
            <button
              onClick={() => setOpen(true)}
              className="group relative border border-[#c9a46c] px-10 py-4 text-[14px] uppercase tracking-[0.3em] text-[#6b1f2b] transition-all duration-300 hover:bg-[#6b1f2b] hover:text-white"
            >
              Confirmă prezența
              {/* subtle glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a46c]/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </section>
      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
