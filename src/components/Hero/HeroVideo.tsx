import { motion } from "framer-motion"

type Props = {
  opened: boolean
}

export default function HeroVideo({ opened }: Props) {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      animate={opened ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover opacity-70"
      >
        <source src="/video/forest.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={opened ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <h1 className="heading-xl">Denisa & Iuli</h1>
          <p className="mt-4 body-lg">20 August 2026</p>
        </motion.div>
      </div>
    </motion.div>
  )
}