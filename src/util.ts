export const round = (n: number, places: number = 0): number => {
  const offset = 10 ** places;
  return Math.round(n * offset) / offset;
};
