import { useEffect, useState } from "react";

const targetDate = new Date("2026-08-20T00:00:00");

export default function Countdown() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));

  return (
    <section className='bg-primary-dark text-center py-32'>
      <h2 className='heading-lg text-accent-red'>Until the Day</h2>

      <div className='mt-10 text-6xl font-serif text-gold'>{days} days</div>
    </section>
  );
}
