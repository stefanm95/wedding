export function getImpact(progress: number) {
  const start = 0.92;
  const end = 1.05;

  if (progress < start || progress > end) return 0;

  const p = (progress - start) / (end - start);

  return Math.sin(p * Math.PI); // clean bell curve
}
