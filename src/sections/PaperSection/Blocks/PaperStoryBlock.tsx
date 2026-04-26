// blocks/PaperStoryBlock.tsx
import type { PaperBlockProps } from "../../../types/paper";
import Story from "../Story/Story";
import PaperBackground from "./PaperBackground";

export default function PaperStoryBlock({ variant }: PaperBlockProps) {
  return (
    <section className='relative py-32 md:py-40'>
      {/* 🧻 PAPER REAL (nu overlay) */}
      <div className='absolute inset-0 flex justify-center pointer-events-none'>
        <img
          src='/assets/paper/paper-mid-split.jpg'
          className='
        w-full max-w-[1100px]
        h-full
        object-cover
      '
        />
      </div>

      {/* ✨ CONTENT */}
      <div className='relative z-10 max-w-4xl mx-auto px-6'>
        <Story />
      </div>
    </section>
  );
}
