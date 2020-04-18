/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint linebreak-style: ["error","windows"] */

const regionData = {
  name: "Africa",
  avgAge: 19,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
};

const populationData = {
  getDefaultPopulation: () => 66622705,
  getPopulation: (val) => val
};

const hospitalBedsData = {
  getDefaultBeds: () => 1380614
};

function normalizeDays(periodType, value) {
  if (periodType === 'Weeks') {
    return (value * 7);
  }
  if (periodType === 'Months') {
    return (value * 30);
  }
  return value;
}

const impactEstimatorOutput = (data) => ({
  inputData: data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)),
    severeCasesByRequestedTime: data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)) * 0.15,
    hospitalBedsByRequestedTime: Math.round(data.totalHospitalBeds * 0.35) - data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)) * 0.15,
    casesForICUByRequestedTime: data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)) * 0.05,
    casesForVentilatorsByRequestedTime: data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)) * 0.02,
    dollarsInFlight: data.reportedCases * 10 * (2 ** (data.timeToElapse / 3)) * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse
  },
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)),
    severeCasesByRequestedTime: data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)) * 0.15,
    hospitalBedsByRequestedTime: Math.round(data.totalHospitalBeds * 0.35) - data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)) * 0.15,
    casesForICUByRequestedTime: data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)) * 0.05,
    casesForVentilatorsByRequestedTime: data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)) * 0.02,
    dollarsInFlight: data.reportedCases * 50 * (2 ** (data.timeToElapse / 3)) * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse
  }
});

export {
  impactEstimatorOutput, regionData, populationData, hospitalBedsData, normalizeDays
};

const covid19ImpactEstimator = (data) => data;

export default covid19ImpactEstimator;
