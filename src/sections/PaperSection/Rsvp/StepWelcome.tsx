import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  onNext: (attending: "yes" | "no") => void;
};

export function StepWelcome({ onNext }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='text-center space-y-10'
    >
      <h2 className='text-[28px] md:text-[34px] text-[#6b1f2b] font-serif'>
        Veți fi alături de noi?
      </h2>

      <div className='flex flex-col gap-4'>
        <button
          onClick={() => onNext("yes")}
          className='
            px-8 py-4
            border border-[#c9a46c]
            tracking-[0.3em]
            uppercase
            text-[#6b1f2b]
            hover:bg-[#6b1f2b]
            hover:text-white
            transition
          '
        >
          Da, vom fi prezenți
        </button>

        <button
          onClick={() => onNext("no")}
          className='
            px-8 py-4
            border border-[#6b1f2b]/20
            tracking-[0.3em]
            uppercase
            text-[#6b1f2b]/70
            hover:bg-[#6b1f2b]
            hover:text-white
            transition
          '
        >
          Nu putem ajunge
        </button>
      </div>
    </motion.div>
  );
}
