import { cn } from "@utils/cn";

type StoryFoldSafeAreaProps = {
  className?: string;

  /** full override if needed */
  height?: string;

  /** presets */
  size?: "sm" | "md" | "lg";

  /** optional tablet fix */
  disableTabletFix?: boolean;
};

export default function StoryFoldSafeArea({
  className,
  height,
  size = "md",
  disableTabletFix = false,
}: StoryFoldSafeAreaProps) {
  const base = "w-full";

  const sizes = {
    sm: "h-[clamp(100px,14vh,180px)] md:h-[clamp(140px,18vh,220px)] lg:h-[clamp(90px,10vh,140px)]",

    // 🔥 your tuned values
    md: "h-[clamp(70px,9vh,110px)] md:h-[clamp(60px,7vh,90px)] l:h-[20px] xl:h-[20px]",

    lg: "h-[clamp(160px,20vh,260px)] md:h-[clamp(220px,24vh,320px)] lg:h-[120px] xl:h-[clamp(280px,28vh,420px)]",
  };

  const tabletFix = disableTabletFix ? "" : "min-[768px]:max-[820px]:h-[260px]";

  return (
    <div aria-hidden="true" className={cn(base, height ?? sizes[size], tabletFix, className)} />
  );
}
