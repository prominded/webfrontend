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

function processForm(e) {
  e.preventDefault();
  console.log("impact Object...beginining.");
  console.log(document.getElementById('reportedCases').value);
  console.log(document.getElementById('population').value);
  alert(document.getElementById('population').value);


  const formData = {
    pType: "Days",
    tElapse: normalizeDays(document.getElementById('periodType').value, document.getElementById('timeToElapse').value),
    rCases: document.getElementById('reportedCases').value,
    pop: document.getElementById('population').value,
    tBeds: document.getElementById('totalHospitalBeds').value
};


  console.log(regionData);
  

const data = covid19ImpactEstimator({
    region: regionData, 
    periodType: formData.pType,
    timeToElapse: formData.tElapse, 
    reportedCases: formData.rCases,
    population: formData.pop, 
    totalHospitalBeds: formData.tBeds 
 });
  console.log(data.reportedCases);
  console.log(data.region.name);


  console.log(`impact Object... ${data.reportedCases}`);

  const result = impactEstimatorOutput(data);
  console.log(result);
}

document.addEventListener('DOMContentLoaded', (event) => {
  console.log("My Form Object");
  
  document.getElementById('population').value = populationData.getDefaultPopulation();
  document.getElementById('totalHospitalBeds').value = hospitalBedsData.getDefaultBeds();
});

const impButton = document.getElementById('impactButton');
console.log(impButton);
impButton.addEventListener('click', (e) => processForm(e));



