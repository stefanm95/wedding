export default function SealIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`h-6 w-6 transition-all duration-500 ${active ? "scale-110" : "opacity-60"}`}
    >
      <circle cx="20" cy="20" r="14" fill="rgba(107,31,43,0.9)" />

      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-white text-[10px]"
      >
        ♥
      </text>
    </svg>
  );
}
