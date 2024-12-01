export const gcd = (inputA: number, inputB: number) => {
  let a = inputA > inputB ? inputA : inputB;
  let b = inputA > inputB ? inputB : inputA;
  while (true) {
    if (b == 0) return a;
    a %= b;
    if (a == 0) return b;
    b %= a;
  }
};

export const lcm = (a: number, b: number) => {
  return (a / gcd(a, b)) * b;
};

export const multiLcm = (arr: number[]): number => {
  if (arr.length === 2) return lcm(arr[0], arr[1]);
  return lcm(arr[0], multiLcm(arr.slice(1)));
};

const AArray = Object.create(Array);
AArray.first = () => AArray[0];
AArray.last = () => AArray[AArray.length - 1];

export { AArray };
