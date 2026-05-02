import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";
import { stepVariants } from "./stepVariants";

type Props = {
  onClose: () => void;
};

export default function StepRegret({ onClose }: Props) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`${rsvpStyles.step} relative py-16 text-center`}
    >
      {/* ✨ subtle symbol (mai soft decât success) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-[18px] text-[#6b1f2b]/40"
      >
        –
      </motion.div>

      {/* HEADER */}
      <div className="space-y-6">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#6b1f2b]/45">Răspuns primit</p>

        <h2 className="script-cormorant-display text-[36px] text-[#3d2b1f]">
          Ne pare rău că nu puteți ajunge
        </h2>

        {/* ornament (mai soft) */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-[#6b1f2b]/20" />
          <div className="h-1.5 w-1.5 rotate-45 bg-[#6b1f2b]/20" />
          <div className="h-[1px] w-8 bg-[#6b1f2b]/20" />
        </div>
      </div>

      {/* MESSAGE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 max-w-[460px] text-[15px] leading-relaxed text-[#3d2b1f]/75"
      >
        Ne-ar fi făcut mare plăcere să vă avem alături,
        <br />
        dar vă mulțumim că ne-ați anunțat.
        <br />
        <span className="italic">Sperăm să ne revedem curând.</span>
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10"
      >
        <button
          onClick={onClose}
          className="border border-[#6b1f2b]/25 px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-[#6b1f2b]/70 transition hover:border-[#6b1f2b] hover:text-[#6b1f2b]"
        >
          Închide
        </button>
      </motion.div>
    </motion.div>
  );
}
