import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

export default function Story() {
  return (
    <section className="relative -mt-10 pt-8 md:pt-16">
      <div className="mx-auto mb-24 max-w-3xl px-6 text-center md:mb-32">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="space-y-24 md:space-y-32">
          {storyData.map((item) => (
            <StoryItem key={item.title} item={item} />
          ))}
        </div>
      </div>

      <p className="script-cormorant-body mt-24 text-center text-[36px] italic text-[#6b1f2b]/70">
        Vă invităm să fiți alături de noi!
      </p>
    </section>
  );
}
