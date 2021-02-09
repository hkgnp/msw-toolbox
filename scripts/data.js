baseURL = 'https://data.gov.sg/api/action/datastore_search';

////////// Statistics for the Tribunal for the Maintenance of Parents //////////

let loadTribunalData = async () => {
  let response = await axios.get(baseURL, {
    params: {
      resource_id: '7a31cdb0-df53-415d-a57b-d68626e46d11',
      limit: '300',
    },
  });

  let seriesApplicationsForVariation = [];
  for (r of response.data.result.records) {
    seriesApplicationsForVariation.push(r.number_of_applications_for_variation);
  }

  let seriesNewApplicationsforMaintenance = [];
  for (r of response.data.result.records) {
    seriesNewApplicationsforMaintenance.push(
      r.number_of_new_applications_for_maintenance
    );
  }

  let seriesYears = [];
  for (r of response.data.result.records) {
    seriesYears.push(r.year);
  }

  return {
    x: seriesYears,
    ySeriesApplicationsForVariation: seriesApplicationsForVariation,
    ySeriesNewApplicationsforMaintenance: seriesNewApplicationsforMaintenance,
  };
};

let loadInpatientOutpatientAttendances = async () => {
  let response = await axios.get(baseURL, {
    params: {
      resource_id: 'ba3c89a7-cfc2-4c87-afe3-b688b0f0ad75',
      limit: '300',
    },
  });

  let healthAttendances = [];
  for (let r of response.data.result.records) {
    healthAttendances.push({
      section: r.level_1,
      x: r.year,
      y: r.value,
    });
  }

  return healthAttendances;
};

loadInpatientOutpatientAttendances();
