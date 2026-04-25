export default function PolaroidCard() {
  return (
    <div
      className='
    w-full max-w-[320px] md:max-w-[720px]
    p-4 md:p-8
    -mt-8 md:-mt-12
  '
    >
      <img
        alt='lavanda'
        src='/assets/miri/lavanda.jpg'
        className='h-[220px] md:h-[420px]'
      />

      <p className='script-castlegar text-center text-3xl text-[#6b1f2b] mt-3'>
        pâna la ziua noastra
      </p>
    </div>
  );
}
