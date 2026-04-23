import { motion } from "framer-motion";

export default function Details() {
  return (
    <section className="bg-primary-dark text-white py-32 text-center">
      <h2 className="heading-lg text-gold">Details</h2>

      <p className="body-lg mt-6">
        Transport and other important information will be provided.
      </p>
      {/* 🌿 FLORAL */}
      {/* <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            "url('/assets/floral-overlay/floral-bujori-verde.png')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      /> */}
    </section>
  );
}
