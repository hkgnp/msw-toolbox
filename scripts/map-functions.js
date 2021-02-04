// Find current position of user
let currPosition = [];
document.querySelector('#whereami').addEventListener('click', () => {
  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(whereAmI);
    }
  };
  let whereAmI = (position) => {
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

// Find nearest using Current Position of User
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
