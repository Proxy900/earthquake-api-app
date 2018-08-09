$(document).ready(function() {
  var json = $.getJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson', function(data) {
    // console.log(data)
    var quakes = [];

    function Quake(plc, mg, dtl, tm) {
      this.place = plc;
      this.mag = mg;
      this.details = dtl;
      this.time = tm;
      this.date = new Date(0);
      this.date.setUTCSeconds(this.time);
      this.desc = "";
    }

    for (var i = 0; i < data.features.length; i++) {
      quakes.push(new Quake(data.features[i].properties.place, data.features[i].properties.mag,
        "https://earthquake.usgs.gov/earthquakes/eventpage/" + data.features[i].properties.detail.slice(57, 67),
        data.features[i].properties.time));

      if (quakes[i].mag < 1) {
        quakes[i].desc = "Less than Micro";
      }

      if (quakes[i].mag >= 1 && quakes[i].mag < 2) {
        quakes[i].desc = "Micro";
      } else if (quakes[i].mag >= 2 && quakes[i].mag < 4) {
        quakes[i].desc = "Minor";
      } else if (quakes[i].mag >= 4 && quakes[i].mag < 5) {
        quakes[i].desc = "Light";
      } else if (quakes[i].mag >= 5 && quakes[i].mag < 6) {
        quakes[i].desc = "Moderate";
      } else if (quakes[i].mag >= 6 && quakes[i].mag < 7) {
        quakes[i].desc = "Strong";
      } else if (quakes[i].mag >= 7 && quakes[i].mag < 8) {
        quakes[i].desc = "Major";
      } else if (quakes[i].mag > 8) {
        quakes[i].desc = "Great";
      }

      $("#quakes").append('<tr class="quake"><td><a href='+quakes[i].details+'>'+quakes[i].place+'</a></td>'
      +'<td>'+quakes[i].mag+'</td>'+'<td>'+quakes[i].date+'</td><td>'+quakes[i].desc+'</td>');

      $("tr:last").attr('id', i);

      if (quakes[i].mag >= 1) {
        $('#'+i).css('font-weight', '800');
      }

      if (quakes[i].mag < 1) {
        $('#'+i).css('background-color', '#c1d9ff');
      }

      if (quakes[i].mag >= 1 && quakes[i].mag < 2) {
        $('#'+i).css('background-color', '#b8ffb2');
      } else if (quakes[i].mag >= 2 && quakes[i].mag < 3) {
        $('#'+i).css('background-color', '#d2ffb2');
      } else if (quakes[i].mag >= 3 && quakes[i].mag < 4) {
        $('#'+i).css('background-color', '#e6ffb2');
      } else if (quakes[i].mag >= 4 && quakes[i].mag < 5) {
        $('#'+i).css('background-color', '#f8ffb2');
      } else if (quakes[i].mag >= 5 && quakes[i].mag < 6) {
        $('#'+i).css('background-color', '#fff3b2');
      } else if (quakes[i].mag >= 6 && quakes[i].mag < 7) {
        $('#'+i).css('background-color', '#ffe2b2');
      } else if (quakes[i].mag >= 7 && quakes[i].mag < 8) {
        $('#'+i).css('background-color', '#ffc3b2');
      } else if (quakes[i].mag >= 8 && quakes[i].mag < 9) {
        $('#'+i).css('background-color', '#ffbdb2');
      } else if (quakes[i].mag > 9) {
        $('#'+i).css('background-color', '#ff6b6b');
      }
    }
  });
});
