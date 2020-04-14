import covid19ImpactEstimator, { impactEstimatorOutput, regionData, populationData, hospitalBedsData, normalizeDays } from './estimator';

function processForm(e) {
    e.preventDefault();
   const data = {
    pType: "Days",
    tElapse: normalizeDays(document.getElementById('periodType'),document.getElementById('timeToElapse')),
    rCases: document.getElementById('reportedCases'),
    pop: document.getElementById('population'),
    tBeds: document.getElementById('totalHospitalBeds')
   }

    const imputData = covid19ImpactEstimator({
        region: regionData, 
        periodType: data.pType,
        timeToElapse: data.tElapse, 
        reportedCases: data.rCases,
        population: data.pop, 
        totalHospitalBeds: data.tBeds 
    });

    const outputData = impactEstimatorOutput(imputData);
    console.log(outputData);

}

document.addEventListener('DOMContentLoaded', (e) =>{
  const impForm = document.getElementById('impactForm');
  document.getElementById('population').value = populationData.getDefaultPopulation();
  document.getElementById('totalHospitalBeds').value = hospitalBedsData.getDefaultBeds();
  impForm.addEventListener('submit', processForm(e));

});


