import { motion } from "framer-motion";
import { stepVariants } from "./stepVariants";

type Props = {
  onNext: (attending: "yes" | "no") => void;
};

export function StepWelcome({ onNext }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-10 text-center"
    >
      <h2 className="font-serif text-[28px] text-[#6b1f2b] md:text-[34px]">
        Veți fi alături de noi?
      </h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => onNext("yes")}
          className="border border-[#c9a46c] px-8 py-4 uppercase tracking-[0.3em] text-[#6b1f2b] transition hover:bg-[#6b1f2b] hover:text-white"
        >
          Da, vom fi prezenți
        </button>

        <button
          onClick={() => onNext("no")}
          className="border border-[#6b1f2b]/20 px-8 py-4 uppercase tracking-[0.3em] text-[#6b1f2b]/70 transition hover:bg-[#6b1f2b] hover:text-white"
        >
          Nu putem ajunge
        </button>
      </div>
    </motion.div>
  );
}
