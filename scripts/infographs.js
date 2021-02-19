<<<<<<< HEAD
////////// Render Charts //////////

// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
=======
///////////// VIEW /////////////
// Render Tribunal of Maintenance of Parents Chart
const optionsTribunal = {
  theme: {
    palette: 'palette2',
  },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#3F51B5',
        },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#03A9F4',
        },
>>>>>>> dev
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
<<<<<<< HEAD
=======
  theme: {
    palette: 'palette3',
  },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#33B2DF',
        },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#546E7A',
        },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#D4526E',
        },
>>>>>>> dev
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
<<<<<<< HEAD
=======
        style: {
          color: '#13D8AA',
        },
>>>>>>> dev
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
<<<<<<< HEAD
  chart: {
    type: 'bar',
    height: '400px',
  },
  series: [],
=======
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
>>>>>>> dev
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

<<<<<<< HEAD
////////// AXIOS LOADED DATASETS //////////
=======
////////// CONTROLLER //////////
>>>>>>> dev
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

<<<<<<< HEAD
  // Load healthcare dataset
=======
  // Load healthcare dataset (Already has x and y values)
>>>>>>> dev
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
<<<<<<< HEAD
=======
      type: 'bar',
>>>>>>> dev
    },
    {
      name: 'Emergency Department Attendances',
      data: accidentAttendances,
<<<<<<< HEAD
=======
      type: 'bar',
>>>>>>> dev
    },
    {
      name: 'Polyclinic Attendances',
      data: polyclinicAttendnaces,
<<<<<<< HEAD
      type: 'bar',
=======
>>>>>>> dev
    },
    {
      name: 'SOC Attendances',
      data: socAttendances,
<<<<<<< HEAD
      type: 'bar',
=======
>>>>>>> dev
    },
  ]);

  // Load APS and CPS Statistics
  let apsCpsReponse = await loadApsCpsStats();
<<<<<<< HEAD
  console.log(apsCpsReponse);

  let apsInvestigations = apsCpsReponse.apsInvestigations.map(
    (a) => a.vulnerable_adult_investigations_by_msf_aps
  );

  let cpsEnquiries = apsCpsReponse.cpsEnquiries.map(
    (a) => a.enquiries_received
  );

  let cpsYear = apsCpsReponse.cpsEnquiries.map((a) => a.year);
  let apsYear = apsCpsReponse.apsInvestigations.map((a) => a.year);
  apsCpsChart.updateOptions({
    xaxis: {
      categories: apsYear,
    },
  });
  apsCpsChart.updateSeries([
    {
      name: 'Adult Protection Services Investigations',
      data: apsInvestigations,
    },
    {
      name: 'Child Protection Services Enquiries',
      data: cpsEnquiries,
    },
    {
      name: 'Child Protection Services Investigations',
      data: cpsInvestigations,
=======

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
>>>>>>> dev
    },
  ]);
});
