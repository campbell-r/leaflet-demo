var map = L.map('map').setView([36.7783, -119.4179], 6);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiY2FtcGJlbGxyIiwiYSI6ImNqdmlwNXYyejA4Y2c0OG9qYnAyanlxdncifQ.t6djm2dI83fR6xpD4G1lhQ'
}).addTo(map);
var goodwillIcon = L.icon({
  iconUrl: 'url goes here',
  shadowUrl: 'url goes here',
  iconSize: [20, 20],
  iconAnchor: [0, 0],
  shadowAnchor: [20, 20],
  popupAnchor: [20, 20],
});

function fetchData() {
  fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for(i=0;i<data.features.length;i++){
        console.log(data.features[i].geometry.coordinates[0])
        var marker = L.marker([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]).addTo(map);
      }
      //do something with that data
      //console.log(data.features[0].geometry.coordinates[1]);

    });
}
fetchData();








// var fruits = ['apple','oranges','grapes','mangos','plums'];
// function myLoop(){
//   for(i=0;i<fruits.length;i++){
//     console.log(fruits[i])
//
//   }
// }
// myLoop();
