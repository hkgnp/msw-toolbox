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

// Use "Postal Code" to find nearest services"
document.querySelector('#submit-search').addEventListener('click', () => {
  ///////////// SECTION: USER INPUTS /////////////

  // Services selected
  let allLayers = {
    searchSsoLayer: searchSsoLayer,
    searchDisabilityLayer: searchDisabilityLayer,
    searchFscLayer: searchFscLayer,
  };

  let userService;
  let serviceRadios = document.querySelectorAll('.services');
  for (let service of serviceRadios) {
    if (service.checked) {
      userService = allLayers[service.value];
      break;
    }
  }

  // Postal code
  let searchPostalCode = [];
  let userPostalCode = document.querySelector('#postalcode');
  (async () => {
    let response = await axios.get(
      'https://developers.onemap.sg/commonapi/search',
      {
        params: {
          searchVal: userPostalCode.value,
          returnGeom: 'Y',
          getAddrDetails: 'Y',
          pageNum: '1',
        },
      }
    );

    let postalCodeResults = response.data.results[0];
    searchPostalCode = [
      parseFloat(postalCodeResults.LATITUDE),
      parseFloat(postalCodeResults.LONGITUDE),
    ];

    closestPt = L.GeometryUtil.closestLayer(map, userService, searchPostalCode);

    L.popup()
      .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
      .setContent(
        closestPt.layer.feature.properties.Description ||
          closestPt.layer.feature.properties.name
      )
      .openOn(map);

    map.setView([closestPt.latlng.lat, closestPt.latlng.lng], 18);

    let myIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [33, 68] });
    L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
      icon: myIcon,
    }).addTo(map);
  })();
});

// Use "Use My Location" to find nearest services
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
