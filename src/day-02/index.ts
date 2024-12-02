import { getInputDataForDay, getTestADataForDay, getTestBDataForDay } from '../util/index.js';

const DAY_NUMBER = 2;
const DAY_NUMBER_FORMATTED = DAY_NUMBER.toString(10).padStart(2, '0');
const TEST_ANSWER_A = 2;
const TEST_ANSWER_B = 4;

// ======= Day 02 ======

const transformInputData = (inputData: string[]) => {
  const transformedData = inputData.map((line) => line.split(' ').map(Number));
  return transformedData;
};

const taskA = (inputData: string[], option?: string): number => {
  const data = transformInputData(inputData);
  const timer = option ? `TaskA ${option}` : 'TaskA';
  console.time(timer);

  let safeQty = 0;
  data.forEach((report) => {
    if (report[0] !== report[1]) {
      let isReportSafe = true;
      const direction = report[1] > report[0] ? 'increase' : 'decrease';
      for (let i = 1; i < report.length; i++) {
        if (
          (report[i] > report[i - 1] && direction === 'decrease') ||
          (report[i] < report[i - 1] && direction === 'increase') ||
          Math.abs(report[i] - report[i - 1]) > 3 ||
          Math.abs(report[i] - report[i - 1]) < 1
        ) {
          isReportSafe = false;
          break;
        }
      }

      if (isReportSafe) safeQty += 1;
    }
  });

  console.timeEnd(timer);
  return safeQty;
};

const taskB = (inputData: string[], option?: string) => {
  const data = transformInputData(inputData);
  const timer = option ? `TaskB ${option}` : 'TaskB';
  console.time(timer);

  const isReportSafe = (report: number[]): { isSafe: boolean; faultIndex?: number } => {
    if (report[0] === report[1]) return { isSafe: false, faultIndex: 1 };

    const direction = report[report.length - 1] > report[0] ? 'increase' : 'decrease';
    for (let i = 1; i < report.length; i++) {
      if (
        (report[i] > report[i - 1] && direction === 'decrease') ||
        (report[i] < report[i - 1] && direction === 'increase') ||
        Math.abs(report[i] - report[i - 1]) > 3 ||
        Math.abs(report[i] - report[i - 1]) < 1
      ) {
        return { isSafe: false, faultIndex: i };
      }
    }

    return { isSafe: true };
  };

  let safeReportsQty = 0;
  data.forEach((report) => {
    const { isSafe, faultIndex } = isReportSafe(report);
    if (isSafe) {
      safeReportsQty += 1;
    } else {
      const adjustedReport = report.slice();
      adjustedReport.splice(faultIndex!, 1);
      if (isReportSafe(adjustedReport).isSafe) {
        safeReportsQty += 1;
      } else {
        const adjustedReportPrev = report.slice();
        adjustedReportPrev.splice(faultIndex! - 1, 1);
        if (isReportSafe(adjustedReportPrev).isSafe) {
          safeReportsQty += 1;
        }
      }
    }
  });

  console.timeEnd(timer);
  return safeReportsQty;
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
