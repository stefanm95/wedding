import { motion } from "framer-motion";

const programData = [
  {
    time: "14:30",
    title: "Plecare cu autobuzul",
    location: "Piața Victoriei, București",
  },
  {
    time: "16:00",
    title: "Ceremonie religioasă",
    location: "Biserica X",
  },
  {
    time: "18:00",
    title: "Recepție & Cină festivă",
    location: "Pădurile Regale",
  },
  {
    time: "02:00",
    title: "Întoarcere",
    location: "Autobuz spre București",
  },
];

export default function ProgramInline() {
  return (
    <section className='mt-32 text-center'>
      {/* TITLE */}
      <h2 className='text-2xl tracking-[0.3em] text-[#6b1f2b] mb-20'>
        PROGRAMUL ZILEI
      </h2>

      {/* LIST */}
      <div className='space-y-16 max-w-xl mx-auto'>
        {programData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <p className='text-sm tracking-[0.4em] text-[#6b1f2b]/60 mb-2'>
              {item.time}
            </p>

            <h3 className='text-xl font-serif text-[#6b1f2b]'>{item.title}</h3>

            <p className='text-sm text-[#6b1f2b]/70 mt-1'>{item.location}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
