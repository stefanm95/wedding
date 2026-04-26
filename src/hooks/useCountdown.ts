import { useEffect, useState } from "react";

export type CountdownTime = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): CountdownTime {
  const now = new Date();

  if (now >= targetDate) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // 🧠 1. CALCUL LUNI (calendaristic)
  let months =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth());

  const tempDate = new Date(now);
  tempDate.setMonth(tempDate.getMonth() + months);

  // 🔥 dacă am depășit targetul, scădem o lună
  if (tempDate > targetDate) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  // 🧠 2. DIFERENȚĂ RĂMASĂ DUPĂ LUNI
  const diff = targetDate.getTime() - tempDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    months: Math.max(0, months),
    days,
    hours,
    minutes,
    seconds,
  };
}

export function useCountdown(targetDate: Date): CountdownTime {
  const [time, setTime] = useState<CountdownTime>(() =>
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return time;
}
