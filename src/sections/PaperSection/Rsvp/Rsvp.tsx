import { useState } from "react";

export default function Rsvp() {
  const [status, setStatus] = useState<"yes" | "no" | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <div className='text-center'>
      {/* HEADER */}
      <div className='mb-16'>
        <p className='tracking-[0.4em] uppercase text-[#6b1f2b]/60 mb-4 text-sm'>
          Confirmare
        </p>

        <h2 className='text-[36px] md:text-[44px] text-[#6b1f2b] font-serif'>
          Veți fi alături de noi?
        </h2>
      </div>

      {/* CHOICE */}
      {!status && (
        <div className='flex justify-center gap-6'>
          <button
            onClick={() => setStatus("yes")}
            className='px-8 py-3 border border-[#6b1f2b] text-[#6b1f2b] hover:bg-[#6b1f2b] hover:text-white transition'
          >
            Da, cu drag
          </button>

          <button
            onClick={() => setStatus("no")}
            className='px-8 py-3 border border-[#6b1f2b]/40 text-[#6b1f2b]/70 hover:bg-[#6b1f2b]/10 transition'
          >
            Nu pot ajunge
          </button>
        </div>
      )}

      {/* FORM YES */}
      {status === "yes" && (
        <div className='mt-16 max-w-[500px] mx-auto text-left space-y-6'>
          <input
            placeholder='Numele dumneavoastră'
            className='w-full border-b border-[#6b1f2b]/30 bg-transparent py-2 outline-none'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div>
            <label className='text-sm text-[#6b1f2b]/70'>Număr persoane</label>
            <input
              type='number'
              min={1}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className='w-full border-b border-[#6b1f2b]/30 bg-transparent py-2 outline-none'
            />
          </div>

          <textarea
            placeholder='Mesaj (opțional)'
            className='w-full border-b border-[#6b1f2b]/30 bg-transparent py-2 outline-none resize-none'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className='mt-6 px-6 py-3 bg-[#6b1f2b] text-white'>
            Confirm participarea
          </button>
        </div>
      )}

      {/* FORM NO */}
      {status === "no" && (
        <div className='mt-16 max-w-[500px] mx-auto text-left space-y-6'>
          <input
            placeholder='Numele dumneavoastră'
            className='w-full border-b border-[#6b1f2b]/30 bg-transparent py-2 outline-none'
          />

          <textarea
            placeholder='Un gând pentru noi...'
            className='w-full border-b border-[#6b1f2b]/30 bg-transparent py-2 outline-none resize-none'
          />

          <button className='mt-6 px-6 py-3 bg-[#6b1f2b] text-white'>
            Trimite mesaj
          </button>
        </div>
      )}
    </div>
  );
}
