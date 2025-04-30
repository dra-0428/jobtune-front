
const scoreObj: { [key: string]: number[] } = {};

factorMap.forEach((factor, idx) => {
  scoreObj[factor] = scoreObj[factor] || [];
  scoreObj[factor].push(answers[idx]);
});

const averaged = {};
