import { storyData } from "./storyData";
import StoryItem from "./StoryItem";
import StoryFoldSafeArea from "./StoryFoldSafeArea";

export default function Story() {
  const firstGroup = storyData.slice(0, 1);
  const secondGroup = storyData.slice(1, 2);
  const thirdGroup = storyData.slice(2);

  return (
    <section className="relative pt-8 md:pt-12">
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
