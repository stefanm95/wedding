export default function PolaroidCard() {
  return (
    <div
      className="
        w-[560px] md:w-[720px]
        bg-[#f4f1ea]
        p-8 pb-10
        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
        rotate-[-3deg]
        will-change-transform
      "
    >
      <img
        src="/assets/miri/lavanda.jpg"
        className="w-full h-[320px] object-cover"
      />

      <p className="script-castlegar text-center text-3xl text-[#6b1f2b] mt-3">
        pâna la ziua noastra
      </p>
    </div>
  );
}