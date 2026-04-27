import { useState } from "react";
import { programData } from "./programData";
import ProgramItem from "./ProgramItem";
import RsvpModal from "../Rsvp/RsvpModal";

export default function Program() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          {/* HEADER */}
          <div>
            <h2
              className="text-[36px] md:text-[44px] script-cormorant-display tracking-[0.25em] text-[#6b1f2b] "
              style={{
                textShadow: "1px 1px 0 rgba(0,0,0,0.2)",
              }}
            >
              PROGRAMUL ZILEI
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-24 h-[1px] bg-[#c9a46c]" />
              <div className="w-2 h-2 bg-[#c9a46c] rotate-45" />
              <div className="w-24 h-[1px] bg-[#c9a46c]" />
            </div>
          </div>

          {/* LAYOUT */}
          <div className="mt-24 md:mt-32 grid lg:grid-cols-[1fr_0.8fr] gap-16 items-start">
            {/* 🔥 TIMELINE */}
            <div className="relative pl-14">
              {/* LINE */}
              <div className="absolute left-[22px] top-4 bottom-2 w-[1px] bg-[#6b1f2b]/20" />

              <div className="space-y-16 md:space-y-20">
                {programData.map((item, index) => (
                  <ProgramItem key={index} item={item} />
                ))}
              </div>
            </div>

            {/* 🪶 DECOR (folosești asset-urile tale) */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-[420px] h-[420px] opacity-80">
                <img
                  src="/assets/paper/monogram-emboss.png"
                  alt="decor"
                  className="w-full h-full object-contain opacity-40"
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
          <div className="mt-24 md:mt-32 flex justify-center">
            <button
              onClick={() => setOpen(true)}
              className="
              group
              relative
              px-10 py-4
              text-[14px]
              tracking-[0.3em]
              uppercase
              text-[#6b1f2b]
              border border-[#c9a46c]
              transition-all duration-300
              hover:bg-[#6b1f2b]
              hover:text-white
            "
            >
              Confirmă prezența
              {/* subtle glow */}
              <span
                className="
              absolute inset-0
              opacity-0
              group-hover:opacity-100
              transition
              bg-gradient-to-r from-transparent via-[#c9a46c]/20 to-transparent
            "
              />
            </button>
          </div>
        </div>
      </section>
      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
