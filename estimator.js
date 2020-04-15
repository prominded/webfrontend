const regionData = {
  name: "Africa",
  avgAge: 19,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
}

const populationData = {
  getDefaultPopulation: () => 66622705,
  getPopulation: (val) => val
}

const hospitalBedsData = {
 getDefaultBeds: () => 1380614
}

function normalizeDays(periodType, value) {
  if (periodType === "Weeks") {
    return (value * 7);
}
  if (periodType === "Months") {
    return (value * 30);
}
  return value;
}


const impactEstimatorOutput = (data) => ({
  inputeData: data,
  impact: {
    currentlyInfected: data.reportedCases * 10,
    infectionsByRequestedTime: this.currentlyInfected * (2 ** (data.timeToElapse / 3)),
    severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
    hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
    casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
    casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
    dollarsInFlight: this.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse
},
  severeImpact: {
    currentlyInfected: data.reportedCases * 50,
    infectionsByRequestedTime: this.currentlyInfected * (2 ** (data.timeToElapse / 3)),
    severeCasesByRequestedTime: this.infectionsByRequestedTime * 0.15,
    hospitalBedsByRequestedTime: data.totalHospitalBeds * 0.35,
    casesForICUByRequestedTime: this.infectionsByRequestedTime * 0.05,
    casesForVentilatorsByRequestedTime: this.infectionsByRequestedTime * 0.02,
    dollarsInFlight: this.infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * data.timeToElapse
}
});

export { impactEstimatorOutput, regionData, populationData, hospitalBedsData, normalizeDays }

const covid19ImpactEstimator = (data) => data;

export default covid19ImpactEstimator;
