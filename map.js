google.charts.load("current", {
  packages: ["geochart"]
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  // mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
});
google.charts.setOnLoadCallback(drawMaps);

function drawMaps() {
  drawMap("Country", "world", "countries", "world_div");
  drawMap("Country", "150", "countries", "europe_div");
  drawMap("State", "US", "provinces", "usa_div");
  drawMap("State", "RU", "provinces", "russia_div");
}

function drawMap(title, region, resolution, div_id) {
  var data = google.visualization.arrayToDataTable(
    [[title, "Visitor code"]].concat(
      countries.common.map(function(code) {
        return [code, 0];
      }),
      countries.ulad.map(function(code) {
        return [code, 1];
      }),
      countries.marie.map(function(code) {
        return [code, 2];
      })
    )
  );

  var options = {
    colors: ["#cc3333", "#4eb3d3", "#fed976"],
    legend: "none",
    region: region,
    resolution: resolution
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById(div_id)
  );

  chart.draw(data, options);
}
