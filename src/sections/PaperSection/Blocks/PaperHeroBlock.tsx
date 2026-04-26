// blocks/PaperHeroBlock.tsx
import Countdown from "../Countdown/Countdown";
import PolaroidCard from "../Countdown/PolaroidCard";
import { useCountdown } from "../../../hooks/useCountdown";

export default function PaperHeroBlock() {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className='relative py-32 md:py-40 text-center'>
      <div className='max-w-4xl mx-auto px-6'>
        {/* 📸 POLAROID */}
        <div className='flex justify-center mb-0'>
          <PolaroidCard />
        </div>

        <div
          className='mx-auto w-[200px] md:w-[400px] h-[30px] blur-xl opacity-20'
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.25), transparent 70%)",
          }}
        />

        {/* ⏳ COUNTDOWN */}
        <div className='-mt-6 md:-mt-10'>
          <Countdown {...time} />
        </div>
      </div>
    </section>
  );
}
