export default function Timeline(): React.ReactNode {
  return (
    <div className='relative text-center'>
      <div className='w-[1px] bg-[#6b1f2b]/30 h-40 mx-auto mb-10' />

      <div className='space-y-12'>
        <div>
          <p className='text-sm tracking-[0.3em] text-[#6b1f2b]/60'>
            CEREMONIE
          </p>
          <p className='text-xl font-serif'>Biserica X</p>
        </div>

        <div>
          <p className='text-sm tracking-[0.3em] text-[#6b1f2b]/60'>
            PETRECERE
          </p>
          <p className='text-xl font-serif'>Restaurant Y</p>
        </div>
      </div>
    </div>
  );
}
