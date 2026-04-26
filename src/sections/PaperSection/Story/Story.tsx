import StoryItem from "./StoryItem";
import { storyItems } from "./storyData";

export default function Story() {
  return (
    <section className='relative py-40 overflow-hidden'>
      <div className='relative max-w-6xl mx-auto px-6 z-10'>
        {/* 🔥 STORY PART */}
        <div className='relative'>
          {/* linie doar pentru story */}
          {/* <TimelineLine className='top-0 hidden md:flex' /> */}
          {storyItems.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
        {/* 🔥 TRANSITION SPACE */}
        <div className='h-20' />
      </div>
    </section>
  );
}
