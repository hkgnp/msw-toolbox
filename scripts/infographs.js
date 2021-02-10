////////// RENDER CHARTS //////////

// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  chart: {
    type: 'bar',
    height: '100%',
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

// Render Healthcare Attendances Chart
const optionsHealthAttendances = {
  chart: {
    type: 'line',
    height: '100%',
  },
  series: [],
  // the noData property allows us to define what to show
  // if there is no data loaded
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
    healthAttendancesResponse.filter((r) => r.section == section);

  // Push Acute Hospitals
  let acuteHospitalAdmissions = pushHealthAttendances(
    'Acute Hospitals Admissions'
  );

  // Push Acute Hospitals
  let psychHospitalAdmissions = pushHealthAttendances(
    'Psychiatric Hospitals Admissions'
  );

  // for (let r of healthAttendancesResponse) {
  //   if (r.section == 'Acute Hospitals Admissions')
  //     acuteHospitalAdmissions.push(r);

  //   // if (r.section == 'Psychiatric Hospitals Admissions')
  //   //   psychHospitalAdmissions.push(r);
  // }

  healthAttendancesChart.updateSeries([
    {
      name: 'Acute Hospital Admissions',
      data: acuteHospitalAdmissions,
    },
    {
      name: 'Psychiatric Hospital Admissions',
      data: psychHospitalAdmissions,
    },
  ]);
});
