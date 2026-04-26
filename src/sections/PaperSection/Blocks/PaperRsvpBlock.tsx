import Rsvp from "../Rsvp/RSVP";

export default function PaperRSVPBlock() {
  return (
    <section className='relative py-32 md:py-40 overflow-hidden'>
      {/* TEXTURE */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <img
          src='/assets/paper/paper-mid-split.jpg'
          className='w-full h-full object-cover opacity-50'
        />
      </div>

      <div className='relative z-10 max-w-[1200px] mx-auto px-6 md:px-16'>
        <Rsvp />
      </div>
    </section>
  );
}
