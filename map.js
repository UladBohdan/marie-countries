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
//
// function drawWorldMap() {
//   var data = google.visualization.arrayToDataTable(generateList("Country"));
//
//   var options = {
//     colors: ["#cc3333", "#4eb3d3", "#fed976"],
//     legend: "none",
//     region: "world",
//     resolution: "countries"
//   };
//
//   var chart = new google.visualization.GeoChart(
//     document.getElementById("world_div")
//   );
//
//   chart.draw(data, options);
// }
//
// function drawEuropeMap() {
//   var data = google.visualization.arrayToDataTable(generateList("Country"));
//
//   var options = {
//     colors: ["#cc3333", "#4eb3d3", "#fed976"],
//     legend: "none",
//     region: "150",
//     resolution: "countries"
//   };
//
//   var chart = new google.visualization.GeoChart(
//     document.getElementById("europe_div")
//   );
//
//   chart.draw(data, options);
// }
/*
var countriesCommon = [
  "BY",
  "UA",
  "RU",
  "PL",
  "DE",
  "BG",
  "CZ",
  "LT",
  "LV",
  "EE",
  "MD",
  "CH",
  "FR",
  "LI",
  "SE"
];
var countriesUlad = ["GB", "PT", "US", "MX", "CU"];
var countriesMarie = ["IT", "DK", "NO", "TR"];

Highcharts.mapChart("container", {
  chart: {
    spacingBottom: 20
  },
  title: {
    text: ""
  },

  plotOptions: {
    map: {
      allAreas: false,
      joinBy: ["iso-a2", "code"],
      dataLabels: {
        enabled: true,
        color: "#FFFFFF",
        formatter: function() {
          if (
            this.point.properties &&
            this.point.properties.labelrank.toString() < 5
          ) {
            return this.point.properties["iso-a2"];
          }
        },
        format: null,
        style: {
          fontWeight: "bold"
        }
      },
      mapData: Highcharts.maps["custom/world"],
      tooltip: {
        headerFormat: "",
        pointFormat: "{point.name}: <b>{series.name}</b>"
      }
    }
  },

  series: [
    {
      name: "common",
      color: "#cc3333",
      data: $.map(countriesCommon, function(code) {
        return { code: code };
      })
    },
    {
      name: "Ulad",
      color: "#4eb3d3",
      data: $.map(countriesUlad, function(code) {
        return { code: code };
      })
    },
    {
      name: "Marie",
      color: "#fed976",
      data: $.map(countriesMarie, function(code) {
        return { code: code };
      })
    }
  ]
}); */
