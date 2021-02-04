///////////// SECTION: ALL FUNCTIONS HERE /////////////
let currPosition = [];
let getGpsLocation = () => {
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
      .setContent('Your Location')
      .openOn(map);
    map.setView([position.coords.latitude, position.coords.longitude], 18);
  };
  getLocation();
};

// Function: Get services selected from radio buttons
getServices = () => {
  let allLayers = {
    searchSsoLayer: searchSsoLayer,
    searchDisabilityLayer: searchDisabilityLayer,
    searchFscLayer: searchFscLayer,
  };

  let serviceRadios = document.querySelectorAll('.services');
  for (let service of serviceRadios) {
    if (service.checked) {
      userService = allLayers[service.value];
      return userService;
      break;
    }
  }
};

// Function: Get search results from postal code
let resultsFromPostalCode = () => {
  let searchPostalCode = [];
  let userPostalCode = document.querySelector('#postalcode');
  document.location.href = '#search-results';
  ///////////// SECTION: USER INPUTS /////////////
  getServices();
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
          closestPt.layer.feature.properties.description
      )
      .openOn(map);

    map.setView([closestPt.latlng.lat, closestPt.latlng.lng], 18);

    let myIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [33, 68] });
    L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
      icon: myIcon,
    }).addTo(map);
  })();
};

// Find current position of user
document.querySelector('#whereami').addEventListener('click', () => {
  getGpsLocation();
});

// Use "Postal Code" to find nearest services"
document.querySelector('#submit-search').addEventListener('click', () => {
  if (
    document.querySelector('#postalcode').value.length < 6 ||
    !Number.isInteger(parseInt(document.querySelector('#postalcode').value))
  ) {
    document.querySelector('#timer').innerHTML =
      'Please key in a valid postal code';
    return null;
  } else {
    resultsFromPostalCode();
  }
});

// Use "Use My Location" to find nearest services
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
document.querySelector('#uselocation').addEventListener('click', async () => {
  getGpsLocation();
  let timer = setInterval(loadingTimer, 1000);
  await delay(5000);
  clearInterval(timer);
  document.location.href = '#search-results';
  ///////////// SECTION: USER INPUTS /////////////

  getServices();

  closestPt = L.GeometryUtil.closestLayer(map, userService, currPosition);

  L.popup()
    .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
    .setContent(
      closestPt.layer.feature.properties.Description ||
        closestPt.layer.feature.properties.description
    )
    .openOn(map);

  // let myIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [29, 64] });
  // L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
  //   icon: myIcon,
  // }).addTo(map);s
});
