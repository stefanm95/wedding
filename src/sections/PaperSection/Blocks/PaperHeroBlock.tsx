// blocks/PaperHeroBlock.tsx
import Countdown from "../Countdown/Countdown";
import PolaroidCard from "../Countdown/PolaroidCard";
import { useCountdown } from "../../../hooks/useCountdown";
import PaperBackground from "./PaperBackground";
import type { PaperBlockProps } from "../../../types/paper";

export default function PaperHeroBlock({ variant }: PaperBlockProps) {
  const time = useCountdown(new Date("2026-08-22T16:00:00"));

  return (
    <section className='relative py-24 md:py-32'>
      {/* 🔥 TOP FADE */}
      <div
        className='
    absolute top-0 left-0 right-0 h-24
    bg-gradient-to-b from-black/40 to-transparent
    pointer-events-none
  '
      />
      <div className='max-w-4xl mx-auto px-4 sm:px-6 text-center'>
        {/* POLAROID */}
        <div className='flex justify-center mb-16'>
          <PolaroidCard />
        </div>

        {/* COUNTDOWN */}
        <Countdown {...time} />
      </div>
    </section>
  );
}
