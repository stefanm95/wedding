import { cn } from "@utils/cn";
import { storyData } from "./storyData";
import StoryItem from "./StoryItem";

/* ========================= */
/* 🧻 SAFE AREA (PRO) */
/* ========================= */

type StoryFoldSafeAreaProps = {
  className?: string;

  /** full override if you want total control */
  height?: string;

  /** quick presets */
  size?: "sm" | "md" | "lg";

  /** disable tablet hack if layout is fixed later */
  disableTabletFix?: boolean;
};

function StoryFoldSafeArea({
  className,
  height,
  size = "md",
  disableTabletFix = false,
}: StoryFoldSafeAreaProps) {
  const base = "w-full pointer-events-none select-none";

  const sizes = {
    sm: "h-[clamp(100px,14vh,180px)] md:h-[clamp(140px,18vh,220px)] lg:h-[clamp(90px,10vh,140px)]",
    md: "h-[clamp(320px,34vh,420px)] md:h-[clamp(180px,21vh,280px)] lg:h-[clamp(100px,10vh,160px)]",
    lg: "h-[clamp(160px,20vh,260px)] md:h-[clamp(220px,24vh,320px)] lg:h-[clamp(280px,28vh,420px)]",
  };

  const tabletFix = disableTabletFix ? "" : "min-[768px]:max-[820px]:h-[260px]";

  return (
    <div aria-hidden="true" className={cn(base, height ?? sizes[size], tabletFix, className)} />
  );
}

/* ========================= */
/* 📖 STORY SECTION */
/* ========================= */

export default function Story() {
  const firstGroup = storyData.slice(0, 2);
  const secondGroup = storyData.slice(2, 3);
  const thirdGroup = storyData.slice(3);

  return (
    <section className="relative pt-8 md:pt-12">
      {/* HEADER */}
      <div className="mx-auto mb-28 mt-[4em] h-[12vh] max-w-3xl px-6 text-center md:mb-36 lg:mb-44">
        <p className="mb-4 font-[Castlegar_Caps] uppercase tracking-[0.4em] text-[#6b1f2b]/60">
          Povestea noastră
        </p>

        <h2 className="script-castlegar text-4xl text-[#6b1f2b] md:text-5xl">
          Cum a început totul
        </h2>
      </div>

      {/* FIRST PART */}
      <div className="space-y-28 md:space-y-36 lg:space-y-44">
        {firstGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* 🔥 CONTROLLED FOLD */}
      <StoryFoldSafeArea
        size="sm"
        // height="h-[220px] md:h-[260px]" // ← override when needed
        // disableTabletFix // ← future cleanup
      />

      {/* SECOND PART */}
      <div className="-mt-[3em] space-y-32 md:space-y-48 lg:space-y-48">
        {secondGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>

      {/* 🔥 CONTROLLED FOLD */}
      <StoryFoldSafeArea
        size="lg"
        // height="h-[220px] md:h-[260px]" // ← override when needed
        // disableTabletFix // ← future cleanup
      />

      {/* THIRD+ PART */}
      <div className="space-y-12 md:space-y-40 lg:space-y-12">
        {thirdGroup.map((item) => (
          <StoryItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
