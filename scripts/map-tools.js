///////////// SET ICONS /////////////
const youAreHereIcon = L.icon({
  iconUrl: 'youarehere.png',
  iconAnchor: [33, 68],
});

const pinIcon = L.icon({ iconUrl: 'pin.png', iconAnchor: [33, 68] });

///////////// SECTION: ALL FUNCTIONS HERE /////////////

// FUNCTION: GET GPS LOCAATION //
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
      icon: youAreHereIcon,
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

// FUNCTION: GET SELECTED SERVICE FROM SELECTED RADIO BUTTON //
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
    }
  }
};

// FUNCTION: GET SEARCH RESULTS FROM POSTAL CODE //
let resultsFromPostalCode = () => {
  let searchPostalCode = [];
  let userPostalCode = document.querySelector('#postalcode');
  document.location.href = '#search-results';

  // Get selected "Service" radio button and pass it through OneMap API to get lat, lng
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

    // Refined searchSsoLayer Popup
    if (userService == searchSsoLayer) {
      closestPt = L.GeometryUtil.closestLayer(
        map,
        userService,
        searchPostalCode
      );

      let ssoPopup = document.createElement('div');
      ssoPopup.innerHTML = closestPt.layer.feature.properties.Description;

      let ssoPopupName = ssoPopup.querySelectorAll('td')[4].innerHTML;
      let ssoPopupBlock = ssoPopup.querySelectorAll('td')[5].innerHTML;
      let ssoPopupStreet = ssoPopup.querySelectorAll('td')[8].innerHTML;
      let ssoPopupPostalCode = ssoPopup.querySelectorAll('td')[3].innerHTML;

      L.popup()
        .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
        .setContent(
          `${ssoPopupName}<br/>
          ${ssoPopupBlock} ${ssoPopupStreet} ${ssoPopupPostalCode}
          <br/><button class="btn btn-sm btn-success mt-2" data-toggle="modal" data-target="#referralModal">Refer Patient</button>`
        )
        .openOn(map);

      L.marker([searchPostalCode[0], searchPostalCode[1]], {
        icon: youAreHereIcon,
      })
        .addTo(map)
        .bindPopup('You are here!', { closeOnClick: false, autoClose: false });
    }

    // Refined searchFscLayer Popup
    if (userService == searchFscLayer) {
      closestPt = L.GeometryUtil.closestLayer(
        map,
        userService,
        searchPostalCode
      );

      let fscPopup = document.createElement('div');
      fscPopup.innerHTML = closestPt.layer.feature.properties.Description;

      let fscPopupName = fscPopup.querySelectorAll('td')[9].innerHTML;
      let fscPopupAddress = fscPopup.querySelectorAll('td')[3].innerHTML;
      let fscPopupPostalCode = fscPopup.querySelectorAll('td')[2].innerHTML;

      L.popup()
        .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
        .setContent(
          `${fscPopupName}<br/>
          ${fscPopupAddress} Singapore ${fscPopupPostalCode}
          <br/><button class="btn btn-sm btn-success mt-2" data-toggle="modal" data-target="#referralModal">Refer Patient</button>`
        )
        .openOn(map);
    }

    // Refined searchDisability Layer Popup
    if (userService == searchDisabilityLayer) {
      closestPt = L.GeometryUtil.closestLayer(
        map,
        userService,
        searchPostalCode
      );

      let disabilityPopup = document.createElement('div');
      disabilityPopup.innerHTML =
        closestPt.layer.feature.properties.description;

      let disabilityPopupName = disabilityPopup.querySelectorAll('td')[23]
        .innerHTML;
      let disabilityPopupAddress = disabilityPopup.querySelectorAll('td')[11]
        .innerHTML;
      let disabilityPopupPostalCode = disabilityPopup.querySelectorAll('td')[9]
        .innerHTML;

      L.popup()
        .setLatLng([closestPt.latlng.lat, closestPt.latlng.lng])
        .setContent(
          `${disabilityPopupName}</br>
          ${disabilityPopupAddress} ${disabilityPopupPostalCode}
          <br/><button class="btn btn-sm btn-success mt-2" data-toggle="modal" data-target="#referralModal">Refer Patient</button>`
        )
        .openOn(map);
    }

    // Set view of map after pop-up is triggered //
    map.setView([closestPt.latlng.lat, closestPt.latlng.lng], 15);

    L.marker([closestPt.latlng.lat, closestPt.latlng.lng], {
      icon: pinIcon,
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
});
