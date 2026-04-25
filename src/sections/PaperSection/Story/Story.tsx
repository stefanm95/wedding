import TimelineLine from "../../../components/TimeLine";
import StoryItem from "./StoryItem";
import { storyItems, eventItems } from "./storyData";

export default function Story() {
  return (
    <section className='relative py-40 overflow-hidden'>
      <div className='relative max-w-6xl mx-auto px-6 z-10'>
        {/* 🔥 STORY PART */}
        <div className='relative'>
          {/* linie doar pentru story */}
          <TimelineLine className='top-0' />

          {storyItems.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
        {/* 🔥 TRANSITION SPACE */}
        <div className='h-20' /> {/* 🔥 IMPORTANT */}
        {/* 🔥 EVENTS PART */}
        <div className='relative'>
          {/* linie nouă (separată) */}
          <TimelineLine className='top-0' />

          {eventItems.map((item, index) => (
            <StoryItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
