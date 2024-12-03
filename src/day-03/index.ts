import { getInputDataForDay, getTestADataForDay, getTestBDataForDay } from '../util/index.js';

const DAY_NUMBER = 3;
const DAY_NUMBER_FORMATTED = DAY_NUMBER.toString(10).padStart(2, '0');
const TEST_ANSWER_A = 161;
const TEST_ANSWER_B = 48;

// ======= Day 03 ======

const transformInputDataA = (inputData: string[]) => {
  const pairs: number[][] = [];

  inputData.forEach((line) => {
    Array.from(line.matchAll(/mul\(\d{1,3},\d{1,3}\)/gim)).forEach((regexMatch) => {
      const match = regexMatch[0];
      const pair = match.slice(4, match.indexOf(')')).split(',').map(Number);
      pairs.push(pair);
    });
  });
  return pairs;
};

const transformInputDataB = (inputData: string[]) => {
  const DO = 'do()';
  const DONT = "don't()";
  const pairs: number[][] = [];
  const matches: string[] = [];

  inputData.forEach((line) => {
    Array.from(line.matchAll(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/gim)).forEach((match) =>
      matches.push(match[0])
    );
  });
  let isMulEnabled = true;
  matches.forEach((item) => {
    const match = item[0];
    if (match === DONT) isMulEnabled = false;
    if (match === DO) isMulEnabled = true;
    if (isMulEnabled && match.charAt(0) === 'm') {
      const pair = match.slice(4, match.indexOf(')')).split(',').map(Number);
      pairs.push(pair);
    }
  });
  return pairs;
};

const taskA = (inputData: string[], option?: string): number => {
  const data = transformInputDataA(inputData);
  const timer = option ? `TaskA ${option}` : 'TaskA';
  console.time(timer);

  let answer = 0;
  data.forEach((pair) => {
    answer += pair[0] * pair[1];
  });

  console.timeEnd(timer);
  option && console.log(data);
  return answer;
};

const taskB = (inputData: string[], option?: string): number => {
  const data = transformInputDataB(inputData);
  const timer = option ? `TaskB ${option}` : 'TaskB';
  console.time(timer);

  let answer = 0;
  data.forEach((pair) => {
    answer += pair[0] * pair[1];
  });

  console.timeEnd(timer);
  option && console.log(data);
  return answer;
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
