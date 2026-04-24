import type { CountdownTime } from "../../../types/countdown";

type Props = CountdownTime;

export default function Countdown({
  days,
  hours,
  minutes,
  seconds,
}: Props): React.ReactNode {
  return (
    <div className="text-center mb-32 mt-12">
      

      <div className="flex justify-center gap-10 text-[#6b1f2b]">
        {[days, hours, minutes, seconds].map((value, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl text-[#6b1f2b] script-castlegar">{value}</div>

            <div className="text-sm script-cormorant text-[#6b1f2b] tracking-[0.6em] mt-2 opacity-60">
              {["ZILE", "ORE", "MIN", "SEC"][i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}