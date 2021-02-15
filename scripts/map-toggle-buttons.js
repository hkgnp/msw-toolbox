///////////// SECTION: ALL FUNCTIONS HERE /////////////

// FUNCTION: CALL DISABILITY LAYER //
let callLayerDisability = (responseData, serviceLayer, searchLayer) => {
  layer = L.geoJson(responseData, {
    onEachFeature: (feature, layer) => {
      // Disability Layer Popup
      let disabilityPopup = document.createElement('div');
      disabilityPopup.innerHTML = feature.properties.description;

      let disabilityPopupName = disabilityPopup.querySelectorAll('td')[23]
        .innerHTML;
      let disabilityPopupAddress = disabilityPopup.querySelectorAll('td')[11]
        .innerHTML;
      let disabilityPopupPostalCode = disabilityPopup.querySelectorAll('td')[9]
        .innerHTML;

      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(
          `${disabilityPopupName}
          ${disabilityPopupAddress} ${disabilityPopupPostalCode}`
        )
        .addTo(serviceLayer);

      searchLayer.push(layer);
    },
  });
};

// FUNCTION: CALL SSO LAYER //
let callLayerSso = (responseData, serviceLayer, searchLayer) => {
  layer = L.geoJson(responseData, {
    onEachFeature: (feature, layer) => {
      // Disability Layer Popup
      let ssoPopup = document.createElement('div');
      ssoPopup.innerHTML = feature.properties.Description;

      let ssoPopupName = ssoPopup.querySelectorAll('td')[4].innerHTML;
      let ssoPopupBlock = ssoPopup.querySelectorAll('td')[5].innerHTML;
      let ssoPopupStreet = ssoPopup.querySelectorAll('td')[8].innerHTML;
      let ssoPopupPostalCode = ssoPopup.querySelectorAll('td')[3].innerHTML;

      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(
          `${ssoPopupName}
          ${ssoPopupBlock} ${ssoPopupStreet} ${ssoPopupPostalCode}`
        )
        .addTo(serviceLayer);
      // layer.bindPopup(feature.properties.Description);
      searchLayer.push(layer);
    },
  });
};

// FUNCTION: CALL FSC LAYER //
let callLayerFsc = (responseData, serviceLayer, searchLayer) => {
  layer = L.geoJson(responseData, {
    onEachFeature: (feature, layer) => {
      // Disability Layer Popup
      let fscPopup = document.createElement('div');
      fscPopup.innerHTML = feature.properties.Description;

      let fscPopupName = fscPopup.querySelectorAll('td')[9].innerHTML;
      let fscPopupAddress = fscPopup.querySelectorAll('td')[3].innerHTML;
      let fscPopupPostalCode = fscPopup.querySelectorAll('td')[2].innerHTML;

      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(
          `${fscPopupName}
          ${fscPopupAddress} Singapore ${fscPopupPostalCode}`
        )
        .addTo(serviceLayer);
      // layer.bindPopup(feature.properties.Description);
      searchLayer.push(layer);
    },
  });
};

// FUNCTION: TOGGLE BUTTON FUNCTION //
let toggleButtons = (serviceLayer) => {
  !map.hasLayer(serviceLayer)
    ? map.addLayer(serviceLayer)
    : map.removeLayer(serviceLayer);
};

///////////// SECTION: CREATE LAYERS /////////////

// Create Disability Layer
let searchDisabilityLayer = [];
let disabilityLayer = L.markerClusterGroup();
(async () => {
  let response = await axios.get('geojson/disability.geojson');
  callLayerDisability(response.data, disabilityLayer, searchDisabilityLayer);
})();

// Create SSO layer
let searchSsoLayer = [];
let ssoLayer = L.layerGroup();
(async () => {
  let response = await axios.get('geojson/sso.geojson');
  callLayerSso(response.data, ssoLayer, searchSsoLayer);
})();

// Create FSC layer
let searchFscLayer = [];
let fscLayer = L.markerClusterGroup();
(async () => {
  let response = await axios.get('geojson/fsc.geojson');
  callLayerFsc(response.data, fscLayer, searchFscLayer);
})();

// Trying KML

// let kmlFile = 'geojson/eldercare.kml';

// let elderCarePopup = L.geoJson(null, {
//   pointToLayer: (feature, latlng) => {
//     return L.marker(latlng).bindPopup(feature.properties.name);
//   },
// });

// let elderCareLayer = omnivore
//   .kml(kmlFile, null, elderCarePopup)
//   .on('read', (centerMarker) => {
//     var cM = map.project(centerMarker.popup._latlng);
//     cM.y -= centerMarker.popup._container.clientHeight / 2;
//     map.setZoom(16, { animate: true });
//     map.panTo(map.unproject(cM), { animate: true });
//   })
//   .addTo(map);

// TOGGLE BUTTONS //

// Toggle Disability Button
document.querySelector('#disability-btn').addEventListener('click', () => {
  map.closePopup();
  resetView();
  toggleButtons(disabilityLayer);
});

// Toggle SSO Button
document.querySelector('#sso-btn').addEventListener('click', () => {
  map.closePopup();
  resetView();
  toggleButtons(ssoLayer);
});

// Toggle FSC Button
document.querySelector('#fsc-btn').addEventListener('click', () => {
  map.closePopup();
  resetView();
  toggleButtons(fscLayer);
});
