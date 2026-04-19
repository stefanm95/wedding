import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className='relative h-screen bg-primary-dark text-white overflow-hidden'>
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        className='absolute inset-0 w-full h-full object-cover opacity-70'
      >
        <source src='/video/forest.mp4' />
      </video>

      {/* DARK OVERLAY */}
      <div className='absolute inset-0 bg-black/60' />

      {/* CONTENT */}
      <div className='relative z-10 h-full flex items-center justify-center text-center'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1 className='heading-xl text-gold'>Denisa & Iuli</h1>

          <p className='mt-6 body-lg text-text-muted'>20 August 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
