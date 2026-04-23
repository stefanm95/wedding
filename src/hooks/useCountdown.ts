import { useEffect, useState } from "react";
import type { CountdownTime } from "../types/countdown";

export function useCountdown(targetDate: Date): CountdownTime {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return { days, hours, minutes, seconds };
}