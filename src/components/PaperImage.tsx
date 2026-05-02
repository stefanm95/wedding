import { cn } from "@/utils/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function PaperImage({ src, alt, className }: Props) {
  return (
    <div
      className={cn(
        "border-black/8 relative h-full w-full overflow-hidden border bg-[#f8f5ef]",
        className,
      )}
    >
      {/* 🖼 IMAGE */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center brightness-[0.99] contrast-[0.96] saturate-[0.92]"
      />

      {/* 🔥 SOFT EDGE (ink bleed, not shadow) */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_14px_rgba(0,0,0,0.07)]" />

      {/* 🧻 PAPER BLEND */}
      <div className="bg-[#f4f1ea]/18 pointer-events-none absolute inset-0 mix-blend-multiply" />

      {/* 🌾 GRAIN */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "220px",
        }}
      />
    </div>
  );
}
