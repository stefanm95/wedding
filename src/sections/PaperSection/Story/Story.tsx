import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

function StoryFoldSafeArea() {
  return (
    <div
      aria-hidden="true"
      className="h-[clamp(260px,34vh,420px)] md:h-[clamp(360px,42vh,560px)] min-[768px]:max-[820px]:h-[520px] lg:h-[clamp(460px,44vh,680px)]"
    />
  );
}

export default function Story() {
  const firstGroup = storyData.slice(0, 2);
  const secondGroup = storyData.slice(2);

  return (
    <section className="relative pt-8 md:pt-12">
      <div className="mx-auto mb-28 mt-[4em] h-[12vh] max-w-3xl px-6 text-center md:mb-36 lg:mb-44">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>

      <div className="space-y-28 md:space-y-36 lg:space-y-44">
        {firstGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      <StoryFoldSafeArea />

      <div className="space-y-32 md:space-y-40 lg:space-y-48">
        {secondGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      <p className="script-cormorant-body mt-24 text-center text-[36px] italic text-[#6b1f2b]/70">
        Vă invităm să fiți alături de noi!
      </p>
    </section>
  );
}
