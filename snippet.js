// Choose one of the below to decide what kind of layer you want to have. This will be the 'empty' layer that the function below will add to
let cheapLayer = L.layerGroup();
let cheapLayer = L.markerClusterGroup();

// Call data from file that contains the lat, lng
async function getCheapLayer() {
  let response = await axios.get('cheap.geojson'); // assuming your dataset is in geojson
  layer = L.geoJson(response.data, {
    onEachFeature: (feature) => {
      new L.marker([
        feature.lat,
        feature.lng, // use whatever your dataset is pointing to
      ])
        .bindPopup('Your popup content goes here') // adds a popup to each marker created
        .addTo(cheapLayer); // adds to the layer defined above
    },
  });
}

getCheapLayer(); // call the above function
