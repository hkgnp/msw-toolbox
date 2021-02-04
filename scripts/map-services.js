///////////// SECTION: ALL FUNCTIONS HERE /////////////

// CALL LAYER FUNCTION with short circuit//
let callLayer = (responseData, serviceLayer, searchLayer) => {
  layer = L.geoJson(responseData, {
    onEachFeature: (feature, layer) => {
      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(
          feature.properties.description || feature.properties.Description
        )
        .addTo(serviceLayer);
      // layer.bindPopup(feature.properties.Description);
      searchLayer.push(layer);
    },
  });
};

// TOGGLE BUTTON FUNCTION //
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
  callLayer(response.data, disabilityLayer, searchDisabilityLayer);
})();

// Create SSO layer
let searchSsoLayer = [];
let ssoLayer = L.layerGroup();
(async () => {
  let response = await axios.get('geojson/sso.geojson');
  callLayer(response.data, ssoLayer, searchSsoLayer);
})();

// Create FSC layer
let searchFscLayer = [];
let fscLayer = L.markerClusterGroup();
(async () => {
  let response = await axios.get('geojson/fsc.geojson');
  callLayer(response.data, fscLayer, searchFscLayer);
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
  toggleButtons(disabilityLayer);
});

// Toggle SSO Button
document.querySelector('#sso-btn').addEventListener('click', () => {
  toggleButtons(ssoLayer);
});

// Toggle FSC Button
document.querySelector('#fsc-btn').addEventListener('click', () => {
  toggleButtons(fscLayer);
});
