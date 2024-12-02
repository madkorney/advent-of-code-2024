import { getInputDataForDay, getTestADataForDay, getTestBDataForDay } from '../util/index.js';

const DAY_NUMBER = 1;
const DAY_NUMBER_FORMATTED = DAY_NUMBER.toString(10).padStart(2, '0');
const TEST_ANSWER_A = 11;
const TEST_ANSWER_B = 31;

// ======= Day 01 ======

const transformInputData = (inputData: string[]) => {
  const rightList: number[] = [];
  const leftList: number[] = [];
  inputData.forEach((line) => {
    const [leftId, rightId] = line.split('   ');
    rightList.push(Number(rightId));
    leftList.push(Number(leftId));
  });

  return {
    leftList,
    rightList,
  };
};

const taskA = (inputData: string[], option?: string): number => {
  const { leftList, rightList } = transformInputData(inputData);
  const timer = option ? `TaskA ${option}` : 'TaskA';
  console.time(timer);

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);
  let deltaSumm = 0;
  for (let i = 0; i < leftList.length; i += 1) {
    deltaSumm = deltaSumm + Math.abs(leftList[i] - rightList[i]);
  }

  console.timeEnd(timer);
  return deltaSumm;
};

const taskB = (inputData: string[], option?: string): number => {
  const { leftList, rightList } = transformInputData(inputData);
  const timer = option ? `TaskB ${option}` : 'TaskB';
  console.time(timer);

  const getNumberOfMatches = (value: number) => {
    let matches = 0;
    for (let i = 0; i < rightList.length; i++) {
      if (rightList[i] === value) matches += 1;
    }
    return matches;
  };

  let similarityScore = 0;
  for (let i = 0; i < leftList.length; i += 1) {
    similarityScore += leftList[i] * getNumberOfMatches(leftList[i]);
  }

  console.timeEnd(timer);
  return similarityScore;
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
