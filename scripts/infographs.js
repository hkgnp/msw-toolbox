///////////// VIEW /////////////
// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  theme: {
    palette: 'palette2',
  },
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
        style: {
          color: '#3F51B5',
        },
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
        style: {
          color: '#03A9F4',
        },
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
};

let tribunalResponseChart = new ApexCharts(
  document.querySelector('#tribunal'),
  optionsTribunal
);
tribunalResponseChart.render();
// End Tribunal of Maintenance of Parents Chart

// Render Healthcare Attendances Chart
let optionsHealthAttendances = {
  theme: {
    palette: 'palette3',
  },
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
        style: {
          color: '#33B2DF',
        },
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
        style: {
          color: '#546E7A',
        },
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
        style: {
          color: '#D4526E',
        },
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
        style: {
          color: '#13D8AA',
        },
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
const optionsApsCpsChart = {
  stroke: {
    curve: 'smooth',
  },
  theme: {
    palette: 'palette6',
  },
  chart: {
    type: 'line',
    height: '400px',
  },
  series: [],
  yaxis: {
    show: true,
    title: {
      text: 'Count',
    },
    axisTicks: {
      show: true,
    },
    tooltip: {
      enabled: true,
    },
  },
  noData: {
    text: 'Loading...',
  },
};

let apsCpsChart = new ApexCharts(
  document.querySelector('#apscps'),
  optionsApsCpsChart
);
apsCpsChart.render();
// End Child and Adult Protection Charts

////////// CONTROLLER //////////
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

  // Load healthcare dataset (Already has x and y values)
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
      type: 'bar',
    },
    {
      name: 'Emergency Department Attendances',
      data: accidentAttendances,
      type: 'bar',
    },
    {
      name: 'Polyclinic Attendances',
      data: polyclinicAttendnaces,
    },
    {
      name: 'SOC Attendances',
      data: socAttendances,
    },
  ]);

  // Load APS and CPS Statistics
  let apsCpsReponse = await loadApsCpsStats();

  // Function to get CPS Investigations array
  let pushCpsInvestigations = (abuseType) => {
    let arr = apsCpsReponse.cpsInvestigations.filter(
      (r) => r.type_of_abuse == abuseType
    );
    return arr.map((i) => ({ x: i.year, y: i.count }));
  };

  let physicalAbuse = pushCpsInvestigations('Physical ');
  let sexualAbuse = pushCpsInvestigations('Sexual ');
  let neglectAbuse = pushCpsInvestigations('Neglect ');

  apsCpsChart.updateSeries([
    {
      name: 'Physical Abuse',
      data: physicalAbuse,
    },
    {
      name: 'Sexual Abuse',
      data: sexualAbuse,
    },
    {
      name: 'Neglect Abuse',
      data: neglectAbuse,
    },
  ]);
});
