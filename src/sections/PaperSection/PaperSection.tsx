export default function PaperSection({ children }: any) {
  return (
    <section className="relative z-10 min-h-screen py-32 px-6 overflow-hidden">
      {/* 🔥 SOFT EDGE peste hero */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#f4f1ea] to-transparent z-10" />

      {/* texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/base-paper/paperboard-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/10 z-0" />

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/base-grain2.jpg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">{children}</div>
    </section>
  );
}