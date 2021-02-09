window.addEventListener('DOMContentLoaded', async () => {
  // Load Tribunal Responses
  let tribunalResponse = await loadTribunalData();

  const optionsTribunal = {
    chart: {
      type: 'line',
      height: '100%',
    },
    series: [
      {
        name: 'Applications for Variation',
        data: tribunalResponse.ySeriesApplicationsForVariation,
      },
      {
        name: 'New Applications for Maintenance',
        data: tribunalResponse.ySeriesNewApplicationsforMaintenance,
      },
    ],
    xaxis: {
      categories: tribunalResponse.x,
    },
    // the noData property allows us to define what to show
    // if there is no data loaded
    noData: {
      text: 'Loading...',
    },
  };

  const chart = new ApexCharts(
    document.querySelector('#tribunal'),
    optionsTribunal
  );
  chart.render();

  // Load healthcare attendances
  let healthAttendances = await healthAttendances();
});
