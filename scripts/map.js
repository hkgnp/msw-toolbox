//ONEMAP
let singapore = [1.29, 103.85]; // #1 Singapore latlng
let map = L.map('mapid').setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png', {
  detectRetina: true,
  maxZoom: 18,
  minZoom: 11,
}).addTo(map);

window.addEventListener('DOMContentLoaded', () => {
  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  };
  let currPosition = [];
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

  (async () => {
    let response = await axios.get('../geojson/sso.geojson');
    let layer = L.geoJson(response.data, {
      onEachFeature: (feature, layer) => {
        new L.marker([
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]).addTo(map);

        layer.bindPopup(feature.properties.Description);
        layer.addTo(map);
      },
    });
  })();
});
