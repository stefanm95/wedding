// blocks/PaperProgramBlock.tsx
import type { PaperBlockProps } from "../../../types/paper";
import ProgramInline from "../Program/ProgramInline";
import PaperBackground from "./PaperBackground";

export default function PaperProgramBlock({ variant }: PaperBlockProps) {
  return (
    <section className='relative py-24 md:py-32'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 text-center'>
        {/* TRANSITION TEXT */}
        <p className='italic text-[#6b1f2b]/70 mb-12'>
          Vă invităm să fiți alături de noi
        </p>

        <ProgramInline />
      </div>
    </section>
  );
}
