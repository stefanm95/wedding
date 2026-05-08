import { useDevice } from "@/hooks/useDevice";
import { storyData } from "./storyData";
import StoryFoldSafeArea from "./StoryFoldSafeArea";
import StoryItem from "./StoryItem";

export default function Story() {
  const { isMobile } = useDevice();

  const firstGroup = storyData.slice(0, 1);
  const secondGroup = storyData.slice(1, 2);
  const thirdGroup = storyData.slice(2);

  return (
    <section className="relative pt-2 md:pt-2">
      {/* FIRST PART */}
      <div>
        {firstGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* 🔥 FOLD DESKTOP / TABLET ONLY */}
      {!isMobile && <StoryFoldSafeArea size="lg" />}

      {/* SECOND PART */}
      <div>
        {secondGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* THIRD PART */}
      <div>
        {thirdGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
