export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};
