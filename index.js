/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint linebreak-style: ["error","windows"] */
/* eslint-disable quotes */

import covid19ImpactEstimator, 
{
 impactEstimatorOutput, regionData, populationData,
  hospitalBedsData, normalizeDays 
// eslint-disable-next-line import/extensions
} from './estimator.js';

function printMessage(output) {
  const HTML = `<div class="row row-header"><div class="row-header-cell">Metrics</div><div class="row-header-cell">Impact</div><div class="row-header-cell">Severe Impact</div></div>
  <div class="row table-row"><div class="row-cell metrics">Currently Infected</div><div class="row-cell">${output.impact.currentlyInfected}</div><div class="row-cell">${output.severeImpact.currentlyInfected}</div></div>
   <div class="row table-row lighter-black"><div class="row-cell metrics">Infections by requested time (In ${output.inputData.timeToElapse} days )</div><div class="row-cell">${output.impact.infectionsByRequestedTime}</div><div class="row-cell">${output.severeImpact.infectionsByRequestedTime}</div></div>
    <div class="row table-row"><div class="row-cell metrics">Severe cases by requested time (In ${output.inputData.timeToElapse} days)</div><div class="row-cell">${output.impact.severeCasesByRequestedTime}</div><div class="row-cell">${output.severeImpact.severeCasesByRequestedTime}</div></div>
     <div class="row table-row lighter-black"><div class="row-cell metrics">Exces/shortages of Hospital Beds (In ${output.inputData.timeToElapse} days)</div><div class="row-cell">${output.impact.hospitalBedsByRequestedTime}</div><div class="row-cell">${output.severeImpact.hospitalBedsByRequestedTime}</div></div>
      <div class="row table-row"><div class="row-cell metrics">Cases for ICU by requeted time (In ${output.inputData.timeToElapse} days)</div><div class="row-cell">${output.impact.casesForICUByRequestedTime}</div><div class="row-cell">${output.severeImpact.casesForICUByRequestedTime}}</div></div>
       <div class="row table-row lighter-black"><div class="row-cell metrics">Dollars in flight (In ${output.inputData.timeToElapse} days)</div><div class="row-cell">${output.impact.dollarsInFlight}</div><div class="row-cell">${output.severeImpact.dollarsInFlight}</div></div>`;
  document.getElementById("message").innerHTML = HTML;
}

function processForm(e) {
  e.preventDefault();
  alert("Results are also shown in Browser's console");
  const formData = {
    pType: "Days",
    tElapse: normalizeDays(document.getElementById('periodType').value, document.getElementById('timeToElapse').value),
    rCases: document.getElementById('reportedCases').value,
    pop: document.getElementById('population').value,
    tBeds: document.getElementById('totalHospitalBeds').value
};

  console.log("\n");
  console.log("Processing user input....");
  

const data = covid19ImpactEstimator({
    region: regionData, 
    periodType: formData.pType,
    timeToElapse: formData.tElapse, 
    reportedCases: formData.rCases,
    population: formData.pop, 
    totalHospitalBeds: formData.tBeds 
 });


  console.log(`Region: ${data.region.name}`);
  console.log(`Average Age: ${data.region.avgAge}`);
  console.log(`Average Daily Income in USD: ${data.region.avgDailyIncomeInUSD}`);
  console.log(`Average Daily Income Population: ${data.region.avgDailyIncomePopulation}`);


  const result = impactEstimatorOutput(data);
  console.log("------------------------------------------------------------------");
  console.log(`*******************REPORTED CASES: (${result.inputData.reportedCases})***********************`);
  console.log("------------------------------------------------------------------");

  console.log(` Impact-> Currently Infected: ${result.impact.currentlyInfected}`);
  console.log(` Severe Impact-> Currently Infected: ${result.severeImpact.currentlyInfected}`);
  console.log("\n");

  console.log("------------------------------------------------------------------");
  console.log(`*******************(${result.inputData.timeToElapse} Days from Now)***********************`);
  console.log("------------------------------------------------------------------");
  console.log(` Impact-> Infections could rise to: ${result.impact.infectionsByRequestedTime}`);
  console.log(` Severe Impact-> Infections could rise to: ${result.severeImpact.infectionsByRequestedTime}`);

  console.log("------------------------------------------------------------------");
  console.log(`*******************Cases that will require hospitalization in (${result.inputData.timeToElapse} days time)***********************`);
  console.log("------------------------------------------------------------------");
  console.log(` Impact-> (${result.impact.severeCasesByRequestedTime}) severe positive cases will require Hostitalization`);
  console.log(` Severe Impact-> (${result.severeImpact.severeCasesByRequestedTime}) severe possitive cases which will require Hostitalization in (${result.inputData.timeToElapse} days time`);


  console.log("----------------------------------------------------------------------------");
  console.log(`******Total Number of Hospital Beds/Available Beds: (${result.inputData.totalHospitalBeds})/(${Math.round(result.inputData.totalHospitalBeds * 0.35)})********`);
  console.log("----------------------------------------------------------------------------");
  console.log(` Impact-> (${result.impact.hospitalBedsByRequestedTime}) Beds will be in Excess/short supply for Hopitalization in ${result.inputData.timeToElapse} days time`);
  console.log(` Severe Impact->  (${result.severeImpact.hospitalBedsByRequestedTime}) Beds will be in short supply for Hopitalization in ${result.inputData.timeToElapse} days time`);

  console.log("----------------------------------------------------------------------------");
  console.log(`******Total Number that require ICU care in ${result.inputData.timeToElapse} days time********`);
  console.log("----------------------------------------------------------------------------");
  console.log(` Impact-> (${result.impact.casesForICUByRequestedTime}) would require ICU care`);
  console.log(` Severe Impact->(${result.severeImpact.casesForICUByRequestedTime}) would require ICU care`);

  console.log("----------------------------------------------------------------------------");
  console.log(`******The economic loss in the next ${result.inputData.timeToElapse} days:********`);
  console.log("----------------------------------------------------------------------------");
  console.log(` Impact-> ${result.impact.dollarsInFlight}`);
  console.log(` Severe Impact->  ${result.severeImpact.dollarsInFlight}`);


  printMessage(result);
}

  document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('population').value = populationData.getDefaultPopulation();
  document.getElementById('totalHospitalBeds').value = hospitalBedsData.getDefaultBeds();
});

console.log("covid-19 Impact Estimator <loading...>");

const impButton = document.getElementById('impactButton');
impButton.addEventListener('click', (e) => processForm(e));



