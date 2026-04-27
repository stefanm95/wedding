import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

export default function Story() {
  return (
    <section className="relative -mt-10 pt-8 md:pt-16">
      {/* HEADER */}
      <div className="mx-auto mb-24 max-w-3xl px-6 text-center md:mb-32">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        {/* 🔥 FIRST HALF (CONTROLLED HEIGHT) */}
        <div className="space-y-16 md:space-y-20">
          {storyData.slice(0, 3).map((item, index) => (
            <div key={index} className={index === 2 ? "mt-12 md:mt-20" : ""}>
              <StoryItem item={item} index={index} />
            </div>
          ))}
        </div>

        {/* 🔥 GAP EXACT CA SĂ EVIȚI FOLD */}
        <div className="h-99 md:h-99" />

        {/* 🔥 REST */}
        <div className="space-y-24 md:space-y-32">
          {storyData.slice(3).map((item, index) => (
            <StoryItem key={index + 3} item={item} index={index + 3} />
          ))}
        </div>
        {/* 🔥 subtle separator */}
        <div className="absolute inset-0 bg-white/10" />
      </div>
      <p className="script-cormorant-body mt-24 text-center text-[36px] italic text-[#6b1f2b]/70">
        Vă invităm să fiți alături de noi !
      </p>
    </section>
  );
}
