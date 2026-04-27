import Program from "@paper/Program/Program";

export default function PaperProgramBlock() {
  return (
    <section className="relative mt-[35vh] overflow-hidden">
      {/* 🧻 BACKGROUND TEXTURE */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          alt="paper"
          src="/assets/paper/paper-mid-split.jpg"
          className="h-full w-full object-cover object-[center_30%] opacity-50 md:object-[center_35%] lg:object-[center_40%]"
        />
      </div>

      {/* 📄 CONTENT */}
      <div className="max-w-8xl relative z-10 mx-auto px-6 pb-[20vh]">
        <Program />
      </div>
    </section>
  );
}
