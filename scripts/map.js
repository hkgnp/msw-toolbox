//ONEMAP
let singapore = [1.29, 103.85]; // #1 Singapore latlng
let map = L.map('mapid').setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
  detectRetina: true,
  maxZoom: 18,
  minZoom: 11,
}).addTo(map);

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
    currPosition.push(position.coords.latitude, position.coords.longitude);
    let popup = L.popup()
      .setLatLng([position.coords.latitude, position.coords.longitude])
      .setContent('You are here!')
      .openOn(map);
  };

  getLocation();
});
let searchLayer = [];
window.addEventListener('DOMContentLoaded', () => {
  (async () => {
    let response = await axios.get('geojson/sso.geojson');
    layer = L.geoJson(response.data, {
      onEachFeature: (feature, layer) => {
        new L.marker([
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]).addTo(map);
        layer.bindPopup(feature.properties.Description);
        layer.addTo(map);
        searchLayer.push(layer);
      },
    });
  })();
});

document.querySelector('#findnearest').addEventListener('click', () => {
  closestPt = L.GeometryUtil.closestLayer(map, searchLayer, currPosition);

  let popup = L.popup()
    .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
    .setContent(closestPt.layer.feature.properties.Description)
    .openOn(map);

  // let myIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [29, 64] });
  // L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
  //   icon: myIcon,
  // }).addTo(map);s
});
