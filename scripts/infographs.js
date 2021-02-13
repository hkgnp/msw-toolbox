////////// Render Charts //////////

// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  chart: {
    type: 'bar',
    height: '400px',
  },
  series: [],
  xaxis: {},
  yaxis: [
    {
      seriesName: 'Applications for Variation',
      title: {
        text: 'Applications for Variation',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    {
      seriesName: 'New Applications for Maintenance',
      opposite: true,
      title: {
        text: 'New Applications for Maintenance',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  ],
  // the noData property allows us to define what to show
  // if there is no data loaded
  noData: {
    text: 'Loading...',
  },
};

let tribunalResponseChart = new ApexCharts(
  document.querySelector('#tribunal'),
  optionsTribunal
);
tribunalResponseChart.render();
// End Tribunal of Maintenance of Parents Chart

// Render Healthcare Attendances Chart
let optionsHealthAttendances = {
  chart: {
    type: 'line',
    height: '400px',
  },
  title: {
    text: 'Health Attendances (2006 - 2019)',
    align: 'left',
    offsetX: 110,
  },
  series: [],
  yaxis: [
    {
      seriesName: 'Acute Hospital Admissions',
      title: {
        text: 'Acute Hospital Admissions',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    {
      seriesName: 'Emergency Department Attendances',
      title: {
        text: 'Emergency Department Attendances',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    {
      seriesName: 'Polyclinic Attendances',
      opposite: true,
      title: {
        text: 'Polyclinic Attendances',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    {
      seriesName: 'SOC Attendances',
      opposite: true,
      title: {
        text: 'SOC Attendances',
      },
      axisTicks: {
        show: true,
      },
      tooltip: {
        enabled: true,
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

let healthAttendancesChart = new ApexCharts(
  document.querySelector('#healthattendances'),
  optionsHealthAttendances
);
healthAttendancesChart.render();
// End Healthcare Attendances Chart

// Render Child and Adult Protection Charts

// End Child and Adult Protection Charts

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

  //Function to push series to chart
  let pushHealthAttendances = (section) =>
    healthAttendancesResponse.filter(
      (r) => r.section == section && r.x >= 2006
    );

  // Push Acute Hospitals Admissions
  let acuteHospitalAdmissions = pushHealthAttendances(
    'Acute Hospitals Admissions'
  );

  // Push SOC Attendances
  let socAttendances = pushHealthAttendances('Specialist Outpatient Clinics');

  // Push ED Attendances
  let accidentAttendances = pushHealthAttendances(
    'Accident & Emergency Departments'
  );

  // Push Polyclinic Attendances
  let polyclinicAttendnaces = pushHealthAttendances('Polyclinics');

  healthAttendancesChart.updateSeries([
    {
      name: 'Acute Hospital Admissions',
      data: acuteHospitalAdmissions,
    },
    {
      name: 'Emergency Department Attendances',
      data: accidentAttendances,
    },
    {
      name: 'Polyclinic Attendances',
      data: polyclinicAttendnaces,
      type: 'bar',
    },
    {
      name: 'SOC Attendances',
      data: socAttendances,
      type: 'bar',
    },
  ]);

  // Load APS and CPS Statistics
  let apsCpsStats = await apsCpsStats();
  console.log(apsCpsStats);
});
