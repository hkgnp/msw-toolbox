////////// RENDER CHARTS //////////

// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  chart: {
    type: 'line',
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
    type: 'histogram',
    height: '100%',
  },
  plotOptions: {
    bar: {
      distributed: true,
    },
  },
  legend: {
    show: false,
  },
  series: [],
  // the noData property allows us to define what to show
  // if there is no data loaded
  noData: {
    text: 'Loading...',
  },
  colors: ['#91091e', '#da723c', '#c39e5c'],
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
  let healthAttendancesResponse = await loadInpatientOutpatientAttendances();

  let acuteHospitalAdmissions = [];
  for (let r of healthAttendancesResponse) {
    if (
      r.section == 'Acute Hospitals Admissions' &&
      r.x >= '2007' &&
      r.x <= '2019'
    ) {
      acuteHospitalAdmissions.push(r);
    }
  }

  healthAttendancesChart.updateSeries([
    {
      name: 'Acute Hospital Admissions',
      data: acuteHospitalAdmissions,
    },
  ]);
  console.log(acuteHospitalAdmissions);
});
