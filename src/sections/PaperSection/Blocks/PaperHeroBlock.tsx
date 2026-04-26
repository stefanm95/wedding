// blocks/PaperHeroBlock.tsx
import Countdown from "../Countdown/Countdown";
import PolaroidCard from "../Countdown/PolaroidCard";
import { useCountdown } from "../../../hooks/useCountdown";

export default function PaperHeroBlock() {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className='relative py-32 md:py-40 text-center'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='flex justify-center mb-16'>
          <PolaroidCard />
        </div>

        <Countdown {...time} />
      </div>
    </section>
  );
}
