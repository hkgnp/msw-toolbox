///////////// MODEL /////////////
baseURL = 'https://data.gov.sg/api/action/datastore_search';

////////// Statistics for the Tribunal for the Maintenance of Parents //////////

let loadTribunalData = async () => {
  try {
    let response = await axios.get(baseURL, {
      params: {
        resource_id: '7a31cdb0-df53-415d-a57b-d68626e46d11',
        limit: '300',
      },
    });

    let seriesApplicationsForVariation = [];
    for (r of response.data.result.records) {
      seriesApplicationsForVariation.push(
        r.number_of_applications_for_variation
      );
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
  } catch (e) {
    console.log(e);
  }
};

////////// Statistics for Healthcare Attendances and Admissions //////////

let loadInpatientOutpatientAttendances = async () => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

////////// Child and Adult Protection Statistics //////////

let loadApsCpsStats = async () => {
  try {
    // Not used
    let apsInvestigations = await axios.get(baseURL, {
      params: {
        resource_id: 'f07b21ba-215f-4d56-bb96-749ee496ff3f',
        limit: '300',
      },
    });

    // Not used
    let cpsEnquiries = await axios.get(baseURL, {
      params: {
        resource_id: '594b9520-a099-4e41-8c1a-9d1ce23b9e24',
        limit: '300',
      },
    });

    let cpsInvestigations = await axios.get(baseURL, {
      params: {
        resource_id: '6225d302-1a2b-43e9-bbb8-b359bab9bae8',
        limit: '300',
      },
    });
    return {
      cpsInvestigations: cpsInvestigations.data.result.records,
    };
  } catch (e) {
    console.log(e);
  }
};
