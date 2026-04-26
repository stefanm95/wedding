import { useEffect, useState } from "react";
import type { CountdownTime } from "../types/countdown";

export function useCountdown(targetDate: Date): CountdownTime {
  const calculate = () => {
    const now = new Date().getTime();
    const diff = Math.max(targetDate.getTime() - now, 0);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState<CountdownTime>(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
