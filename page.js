$(document).ready(function() {
  var json = $.getJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(data) {
    // console.log(data)
    var quakes = {};
    for (var i = 0; i < data.features.length; i++) {
      quakes[i] = {};
      quakes[i].place = data.features[i].properties.place;
      quakes[i].mag = data.features[i].properties.mag;
      quakes[i].details = "https://earthquake.usgs.gov/earthquakes/eventpage/" + data.features[i].properties.detail.slice(57, 67);
      quakes[i].time = data.features[i].properties.time;
      $("#quakes").append('<p><a href='+quakes[i].details+">"+quakes[i].place+": "+quakes[i].mag+"</a></p>");
      $("p").attr('class', 'quake');
    }
    console.log(quakes);
  });
});
