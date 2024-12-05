import { getInputDataForDay, getTestADataForDay, getTestBDataForDay } from '../util/index.js';

const DAY_NUMBER = 5;
const DAY_NUMBER_FORMATTED = DAY_NUMBER.toString(10).padStart(2, '0');
const TEST_ANSWER_A = 143;
const TEST_ANSWER_B = 123;

// ======= Day 05 ======

const transformInputData = (inputData: string[]) => {
  const splitIndex = inputData.findIndex((line) => line === '');
  const pagesAfter: Record<number, number[]> = {};
  const pagesBefore: Record<number, number[]> = {};
  inputData
    .slice()
    .splice(0, splitIndex)
    .forEach((rule) => {
      const [pageA, pageB] = rule.split('|').map(Number);
      if (pageA in pagesAfter) {
        pagesAfter[pageA].push(pageB);
      } else {
        pagesAfter[pageA] = [pageB];
      }

      if (pageB in pagesBefore) {
        pagesBefore[pageB].push(pageA);
      } else {
        pagesBefore[pageB] = [pageA];
      }
    });

  const updates = inputData
    .slice()
    .splice(splitIndex + 1)
    .map((line) => line.split(',').map(Number));

  return {
    pagesAfter,
    pagesBefore,
    updates,
  };
};

const isUpdateOrderCorrect = (
  update: number[],
  pagesAfter: Record<number, number[]>,
  pagesBefore: Record<number, number[]>
) => {
  let isCorrect = true;
  for (let k = 0; k < update.length - 1; k++) {
    const head = update.slice().splice(0, k);
    const tail = update.slice().splice(k + 1);
    isCorrect =
      tail.every((page) => update[k] in pagesAfter && pagesAfter[update[k]].includes(page)) &&
      head.every((page) => update[k] in pagesBefore && pagesBefore[update[k]].includes(page));
    if (!isCorrect) break;
  }
  return isCorrect;
};

const taskA = (inputData: string[], option?: string): number => {
  const { updates, pagesAfter, pagesBefore } = transformInputData(inputData);
  const timer = option ? `TaskA ${option}` : 'TaskA';
  console.time(timer);

  let midPageSumm = 0;
  for (let i = 0; i < updates.length; i++) {
    if (isUpdateOrderCorrect(updates[i], pagesAfter, pagesBefore)) {
      midPageSumm += updates[i][(updates[i].length - 1) / 2];
    }
  }

  console.timeEnd(timer);
  return midPageSumm;
};

const taskB = (inputData: string[], option?: string): number => {
  const { updates, pagesAfter, pagesBefore } = transformInputData(inputData);
  const timer = option ? `TaskB ${option}` : 'TaskB';
  console.time(timer);

  let midPageSumm = 0;
  for (let i = 0; i < updates.length; i++) {
    if (!isUpdateOrderCorrect(updates[i], pagesAfter, pagesBefore)) {
      midPageSumm += updates[i].sort((a, b) => {
        if (a in pagesBefore && pagesBefore[a].includes(b)) return 1;
        if (a in pagesAfter && pagesAfter[a].includes(b)) return -1;
        return 0;
      })[(updates[i].length - 1) / 2];
    }
  }

  console.timeEnd(timer);
  return midPageSumm;
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
