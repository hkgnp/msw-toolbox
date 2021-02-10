////////// RENDER CHARTS //////////

// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  chart: {
    type: 'bar',
    height: '400px',
  },
  series: [],
  xaxis: {},
  // the noData property allows us to define what to show
  // if there is no data loaded
  noData: {
    text: 'Loading...',
  },
};

const tribunalResponseChart = new ApexCharts(
  document.querySelector('#tribunal'),
  optionsTribunal
);
tribunalResponseChart.render();
// End Tribunal of Maintenance of Parents Chart

// Render Healthcare Attendances Chart
const optionsHealthAttendances = {
  chart: {
    type: 'line',
    height: '400px',
  },
  series: [],
  // the noData property allows us to define what to show
  // if there is no data loaded
  yaxis: [
    {
      opposite: true,
      title: {
        text: 'Acute Hospital Attendances',
      },
    },
    {
      title: {
        text: 'Attendances',
      },
    },
  ],
  noData: {
    text: 'Loading...',
  },
  markers: {
    size: 8,
  },
};

const healthAttendancesChart = new ApexCharts(
  document.querySelector('#healthattendances'),
  optionsHealthAttendances
);
healthAttendancesChart.render();
// End Healthcare Attendances Chart

// Render Child and Adult Protection Charts

////////// AXIOS LOADED DATASETS //////////
window.addEventListener('DOMContentLoaded', async () => {
  // Load Tribunal Dataset
  let tribunalResponse = await loadTribunalData();
  tribunalResponseChart.updateOptions({
    xaxis: {
      categories: tribunalResponse.x,
    },
  });
  tribunalResponseChart.updateSeries([
    {
      name: 'Applications for Variation',
      data: tribunalResponse.ySeriesApplicationsForVariation,
    },
    {
      name: 'New Applications for Maintenance',
      data: tribunalResponse.ySeriesNewApplicationsforMaintenance,
    },
  ]);

  // Load healthcare dataset
  // Function to push health attendances to array that will be used in the chart

  let healthAttendancesResponse = await loadInpatientOutpatientAttendances();
  console.log(healthAttendancesResponse);

  //Function to push series to chart
  let pushHealthAttendances = (section) =>
    healthAttendancesResponse.filter(
      (r) => r.section == section && r.x >= 2006
    );

  // Push Acute Hospitals
  let acuteHospitalAdmissions = pushHealthAttendances(
    'Acute Hospitals Admissions'
  );

  // Push Acute Hospitals
  let psychHospitalAdmissions = pushHealthAttendances(
    'Psychiatric Hospitals Admissions'
  );

  let commHospitalAdmissions = pushHealthAttendances(
    'Community Hospitals Admissions'
  );

  let socAttendances = pushHealthAttendances('Specialist Outpatient Clinics');

  healthAttendancesChart.updateSeries([
    {
      name: 'Acute Hospital Admissions',
      data: acuteHospitalAdmissions,
    },
    {
      name: 'Psychiatric Hospital Admissions',
      data: psychHospitalAdmissions,
    },
    {
      name: 'Community Hospital Admissions',
      data: commHospitalAdmissions,
    },
    {
      name: 'Community Hospital Admissions',
      data: socAttendances,
    },
  ]);
});
