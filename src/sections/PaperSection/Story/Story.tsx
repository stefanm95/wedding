import { useRef } from "react";

import StoryItem from "./StoryItem";
import { storyData } from "./storyData";

export default function Story() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className='relative text-center'>
      <div ref={containerRef} className='relative max-w-5xl mx-auto'>
        {/* ITEMS */}
        {storyData.map((item, index) => (
          <StoryItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
