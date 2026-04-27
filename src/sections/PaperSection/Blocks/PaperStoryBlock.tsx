import Story from "../Story/Story";

export default function PaperStoryBlock() {
  return (
    <section className="relative pb-8 pt-12 md:pb-12 md:pt-16">
      <div className="flex flex-col">
        {/* 🔥 FOCUS ELEMENT */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <img
            alt="paper"
            src="/assets/paper/paper-mid-split.jpg"
            className="w-full max-w-[1400px] opacity-60"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-none px-6">
          <Story />
        </div>
      </div>
    </section>
  );
}
