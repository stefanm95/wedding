import type { CountdownTime } from "../../../types/countdown";

type Props = CountdownTime;

export default function Countdown({
  days,
  hours,
  minutes,
  seconds,
}: Props): React.ReactNode {
  return (
    <div className="text-center mb-32">
      <p className="script-castlegar text-4xl text-[#6b1f2b] mb-6">
        până la ziua noastră
      </p>

      <div className="flex justify-center gap-10 text-[#6b1f2b]">
        {[days, hours, minutes, seconds].map((value, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl font-serif">{value}</div>

            <div className="text-xs tracking-[0.3em] mt-2 opacity-60">
              {["ZILE", "ORE", "MIN", "SEC"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}