import { cn } from "@/utils/cn";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function PaperImage({ src, alt, className }: Props) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover object-center" />

      {/* grain subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage: "url('/assets/base-grain/grain2.jpg')",
          backgroundSize: "220px",
        }}
      />
    </div>
  );
}
