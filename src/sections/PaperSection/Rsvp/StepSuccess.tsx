import { motion } from "framer-motion";
import { rsvpStyles } from "./rsvpStyles";

export default function StepSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${rsvpStyles.step} py-8 text-center`}
    >
      <div className={rsvpStyles.header}>
        <p className={rsvpStyles.label}>Confirmat</p>
        <h2 className={rsvpStyles.title}>Vă mulțumim!</h2>
      </div>

      {/* MESSAGE */}
      <p className={`${rsvpStyles.body} mx-auto max-w-md`}>
        Abia așteptăm să sărbătorim împreună această zi specială. Prezența voastră înseamnă foarte
        mult pentru noi.
      </p>
    </motion.div>
  );
}
