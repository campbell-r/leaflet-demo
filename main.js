var map = L.map('map').setView([36.7783, -119.4179], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY2FtcGJlbGxyIiwiYSI6ImNqdmlwNXYyejA4Y2c0OG9qYnAyanlxdncifQ.t6djm2dI83fR6xpD4G1lhQ'
}).addTo(map);
var greenIcon = L.icon({
  iconUrl: 'icons/green.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
});
var yellowIcon = L.icon({
  iconUrl: 'icons/yellow.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
});
var orangeIcon = L.icon({
  iconUrl: 'icons/orange.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
});
var redIcon = L.icon({
  iconUrl: 'icons/red.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
});
var button1 = document.getElementById('button1');

function fetchData() {
  fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-07-30&minlatitude=31&maxlatitude=40&minlongitude=-125&maxlongitude=-110&minmagnitude=4&maxmagnitude=10')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //console.log(data);
      for (i = 0; i < data.features.length; i++) {
        function switchIcons(feature, latlng) {
          switch (feature.properties.alert) {
            case 'green':
              return L.marker(latlng, {
                icon: greenIcon
              });
            case 'yellow':
              return L.marker(latlng, {
                icon: yellowIcon
              });
            case 'orange':
              return L.marker(latlng, {
                icon: orangeIcon
              });
            case 'red':
              return L.marker(latlng, {
                icon: redIcon
              });

          }
        }
        geoJsonLayer = L.geoJson(data, {
          pointToLayer: switchIcons,
          onEachFeature: function(feature, geoJsonLayer) {
            geoJsonLayer.bindPopup('<p><b>Magnitude: </b>' + feature.properties.mag + '<br><b>Location: </b>' + feature.properties.place + '<br><b> Alert: </b>' + feature.properties.alert + '<br><a href="'+feature.properties.url+'"> Click here to see more information.</p>');
          }
        });
      }
    });
}
fetchData();

button1.addEventListener('click', function() {
  if (map.hasLayer(geoJsonLayer)) {
    map.removeLayer(geoJsonLayer);
  } else {
    geoJsonLayer.addTo(map);
  }
})
