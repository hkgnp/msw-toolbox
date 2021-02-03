// Setup Singapore location
let singapore = [1.35, 103.82]; // #1 Singapore latlng
let map = L.map('mapid').setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoiaGtnbnAiLCJhIjoiY2trb3ZudHZjMHVpdzJwcnd4anV2djg1byJ9.cIvwy1AsyIKsp72EvT1nHg',
  }
).addTo(map);

// Find current position
let currPosition = [];
document.querySelector('#whereami').addEventListener('click', () => {
  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };
  let showPosition = (position) => {
    new L.Marker([position.coords.latitude, position.coords.longitude], {
      bounceOnAdd: true,
    }).addTo(map);

    if (currPosition.length == 0) {
      currPosition.push(position.coords.latitude, position.coords.longitude);
    }
    L.popup()
      .setLatLng([position.coords.latitude, position.coords.longitude])
      .setContent('You are here!')
      .openOn(map);
  };

  getLocation();
});

// show the scale bar on the lower left corner
L.control.scale().addTo(map);

// Find Disability layer
let searchDisabilityLayer = [];
let disabilityLayer = L.layerGroup();
(async () => {
  let response = await axios.get('geojson/disability.geojson');
  layer = L.geoJson(response.data, {
    onEachFeature: (feature, layer) => {
      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(feature.properties.name)
        .addTo(disabilityLayer);
      searchDisabilityLayer.push(layer);
    },
  });
})();

// Toggle Disability Button
document.querySelector('#disability-btn').addEventListener('click', () => {
  !map.hasLayer(disabilityLayer)
    ? map.addLayer(disabilityLayer)
    : map.removeLayer(disabilityLayer);
});

// Find SSO layer
let searchSsoLayer = [];
let ssoLayer = L.layerGroup();
(async () => {
  let response = await axios.get('geojson/sso.geojson');
  layer = L.geoJson(response.data, {
    onEachFeature: (feature, layer) => {
      new L.marker([
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ])
        .bindPopup(feature.properties.Description)
        .addTo(ssoLayer);

      // layer.bindPopup(feature.properties.Description);
      searchSsoLayer.push(layer);
    },
  });
})();

// Toggle SSO Button
document.querySelector('#sso-btn').addEventListener('click', () => {
  !map.hasLayer(ssoLayer) ? map.addLayer(ssoLayer) : map.removeLayer(ssoLayer);
});

// Find nearest
document.querySelector('#findnearest').addEventListener('click', () => {
  closestPt = L.GeometryUtil.closestLayer(map, searchSsoLayer, currPosition);

  L.popup()
    .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
    .setContent(closestPt.layer.feature.properties.Description)
    .openOn(map);

  // let myIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [29, 64] });
  // L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
  //   icon: myIcon,
  // }).addTo(map);s
});
