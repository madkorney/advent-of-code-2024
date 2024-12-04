import { getInputDataForDay, getTestADataForDay, getTestBDataForDay } from '../util/index.js';

const DAY_NUMBER = 4;
const DAY_NUMBER_FORMATTED = DAY_NUMBER.toString(10).padStart(2, '0');
const TEST_ANSWER_A = 18;
const TEST_ANSWER_B = 9;

// ======= Day 04 ======

const transformInputData = (inputData: string[]) => {
  const data: string[][] = [];
  inputData.forEach((line) => {
    data.push(line.split(''));
  });
  return data;
};

const taskA = (inputData: string[], option?: string): number => {
  const data = transformInputData(inputData);
  const timer = option ? `TaskA ${option}` : 'TaskA';
  console.time(timer);

  const sizeX = data[0].length - 1;
  const sizeY = data.length - 1;

  const getXmasQty = (x: number, y: number): number => {
    if (data[y][x] !== 'X') return 0;

    const XMAS = ['X', 'M', 'A', 'S'];
    let xmasQty = 0;

    const hasXmas = (x: number, dx: number, y: number, dy: number) => {
      if (
        (dx === 0 && dy === 0) ||
        x + dx * 3 < 0 ||
        y + dy * 3 < 0 ||
        x + dx * 3 > sizeX ||
        y + dy * 3 > sizeY
      )
        return false;

      let itsXmas = true;
      for (let k = 0; k < 4; k++) {
        if (itsXmas && data[y + dy * k][x + dx * k] !== XMAS[k]) itsXmas = false;
      }

      return itsXmas;
    };

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (hasXmas(x, dx, y, dy)) xmasQty += 1;
      }
    }

    return xmasQty;
  };

  let totalXmas = 0;
  for (let j = 0; j <= sizeY; j++) {
    for (let i = 0; i <= sizeX; i++) {
      totalXmas += getXmasQty(i, j);
    }
  }

  console.timeEnd(timer);
  return totalXmas;
};

const taskB = (inputData: string[], option?: string): number => {
  const data = transformInputData(inputData);
  const timer = option ? `TaskB ${option}` : 'TaskB';
  console.time(timer);

  const sizeX = data[0].length - 1;
  const sizeY = data.length - 1;

  const isX_Mas = (x: number, y: number) => {
    if (data[y][x] !== 'A') return false;

    if (x === 0 || y === 0 || x === sizeX || y === sizeY) {
      return false;
    }

    const diag1 = data[y - 1][x - 1] + data[y][x] + data[y + 1][x + 1];
    const diag2 = data[y - 1][x + 1] + data[y][x] + data[y + 1][x - 1];

    return (diag1 === 'MAS' || diag1 === 'SAM') && (diag2 === 'MAS' || diag2 === 'SAM');
  };

  let totalXmas = 0;
  for (let j = 0; j <= sizeY; j++) {
    for (let i = 0; i <= sizeX; i++) {
      if (isX_Mas(i, j)) totalXmas += 1;
    }
  }

  console.timeEnd(timer);
  return totalXmas;
};

try {
  const inputData = getInputDataForDay(DAY_NUMBER);
  const testDataA = getTestADataForDay(DAY_NUMBER);
  const testDataB = getTestBDataForDay(DAY_NUMBER);
  const testAnswerPartA = taskA(testDataA, 'test');
  const answerPartA = taskA(inputData);
  const testAnswerPartB = taskB(testDataB ? testDataB : testDataA, 'test');
  const answerPartB = taskB(inputData);

  console.log(
    `Day ${DAY_NUMBER_FORMATTED}, Task A test: ${
      testAnswerPartA === TEST_ANSWER_A ? 'PASSED' : 'FAILED!'
    } (answer is ${testAnswerPartA})`
  );

  console.log(`Day ${DAY_NUMBER_FORMATTED}, Task A answer: ${answerPartA}`);

  console.log(
    `Day ${DAY_NUMBER_FORMATTED}, Task B test: ${
      testAnswerPartB === TEST_ANSWER_B ? 'PASSED' : 'FAILED!'
    } (answer is ${testAnswerPartB})`
  );

  console.log(`Day ${DAY_NUMBER_FORMATTED}, Task B answer: ${answerPartB}`);
} catch (error) {
  console.error('Error: ', (error as Error).message);
}
