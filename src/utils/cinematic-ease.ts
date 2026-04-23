export function cinematicEase(t: number) {
  // clamp safety
  if (t <= 0) return 0;

  // 🎯 Phase split
  const holdEnd = 0.15; // slow intro
  const accelEnd = 0.75; // main motion
  const overshootEnd = 1.05; // slight push beyond 1

  // 🧊 1. HOLD (barely moves)
  if (t < holdEnd) {
    const p = t / holdEnd;
    return p * p * 0.05; // very subtle movement
  }

  // 🚀 2. ACCELERATION (cubic out)
  if (t < accelEnd) {
    const p = (t - holdEnd) / (accelEnd - holdEnd);
    const eased = 1 - Math.pow(1 - p, 3);
    return 0.05 + eased * 0.85;
  }

  // 💥 3. OVERSHOOT (go past 1)
  if (t < overshootEnd) {
    const p = (t - accelEnd) / (overshootEnd - accelEnd);
    return 0.9 + Math.sin(p * Math.PI * 0.5) * 0.25;
  }

  // 🪶 4. SETTLE (ease back to 1)
  const p = (t - overshootEnd) / (1.2 - overshootEnd);
  const settle = 1 + (1 - p) * 0.05; // slight bounce back
  return Math.min(settle, 1.2);
}
