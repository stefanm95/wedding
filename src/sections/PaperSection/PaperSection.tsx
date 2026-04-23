import type { ReactNode } from "react";

type PaperSectionProps = {
  children: ReactNode;
};

export default function PaperSection({
  children,
}: PaperSectionProps): React.ReactNode {
  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* 📜 cardboard */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/paperboard-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.95)",
        }}
      />

      {/* 🌫 vignette */}
      <div className="absolute inset-0 bg-black/10 z-0" />

      {/* 🎞 grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      {/* 🧱 content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  );
}