function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
function isWeekProfitable(probabilityOfProfitInAWeek) {
  const roll = randomInt(0, 100);
  return roll < probabilityOfProfitInAWeek;
}
function runSimulation({
  initialAmount = 300000,
  brokeragePaidPerWeek = 300,
  possibleReturnPerWeekInPercentage = 1,
  possibleLossPerWeekInPercentage = 2,
  expectedProfitOverAnYear = 10,
  numberOfSimulations = 100000,
}) {
  const output = [];
  for (let k = 100; k > 49; k--) {
    const probabilityOfProfitInAWeek = k;

    const results = [];
    const numberOfWeeksInAYear = 52;
    for (let j = 0; j < numberOfSimulations; j++) {
      let amount = initialAmount;
      for (let i = 0; i < numberOfWeeksInAYear; i++) {
        amount = amount - brokeragePaidPerWeek;
        if (isWeekProfitable(probabilityOfProfitInAWeek)) {
          amount = amount * (1 + possibleReturnPerWeekInPercentage / 100);
        } else {
          amount = amount * (1 - possibleLossPerWeekInPercentage / 100);
        }
      }
      results.push(amount.toFixed(0));
    }

    const profitableSimulations = results.reduce(
      (sum, next) =>
        +next > initialAmount * (1 + expectedProfitOverAnYear / 100)
          ? sum + 1
          : sum,
      0,
    );
    const numberOfProfitableSimulations = Math.floor(
      (profitableSimulations * 100) / numberOfSimulations,
    );
    output.push({ profitability: k, numberOfProfitableSimulations });

    console.log(
      `${k} ${Math.floor(
        (profitableSimulations * 100) / numberOfSimulations,
      )}% simulations you ended your year with ${expectedProfitOverAnYear}% profits`,
    );
  }
  return output;
}

onmessage = e => {
  const {
    initialAmount = 300000,
    brokeragePaidPerWeek = 300,
    possibleReturnPerWeekInPercentage = 1,
    possibleLossPerWeekInPercentage = 2,
    expectedProfitOverAnYear = 10,
    numberOfSimulations = 100000,
  } = e.data;
  const results = runSimulation({
    initialAmount,
    brokeragePaidPerWeek,
    possibleReturnPerWeekInPercentage,
    possibleLossPerWeekInPercentage,
    expectedProfitOverAnYear,
    numberOfSimulations,
  });
  postMessage({
    results,
  });
};
