import { storyData } from "./storyData";
import StoryItem from "./StoryItem";
import StoryFoldSafeArea from "./StoryFoldSafeArea";

export default function Story() {
  const firstGroup = storyData.slice(0, 1);
  const secondGroup = storyData.slice(1, 2);
  const thirdGroup = storyData.slice(2);

  return (
    <section className="relative pt-8 md:pt-12">
      {/* HEADER */}
      <div className="mx-auto mb-28 mt-[4em] h-[12vh] max-w-3xl px-6 text-center md:mb-36 lg:mb-44">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>

      {/* FIRST PART */}
      <div>
        {firstGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* 🔥 FOLD */}
      <StoryFoldSafeArea size="lg" />

      {/* SECOND PART */}
      <div>
        {secondGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* 🔥 FOLD */}
      <StoryFoldSafeArea size="sm" />

      {/* THIRD PART */}
      <div>
        {thirdGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
