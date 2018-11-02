var common_data = intersection(users.ulad.countries, users.marie.countries);
var unique_first = difference(users.ulad.countries, common_data);
var unique_second = difference(users.marie.countries, common_data);

google.charts.load("current", {
  packages: ["geochart"]
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  // mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
});
google.charts.setOnLoadCallback(renderPage);

function renderPage() {
  drawMaps();
  renderNames();
  renderCounters();
  renderCountryLists();
}

function drawMaps() {
  drawMap("Country", "world", "countries", "world_div");
  drawMap("Country", "150", "countries", "europe_div");
  drawMap("State", "US", "provinces", "usa_div");
  drawMap("State", "RU", "provinces", "russia_div");
  drawMap("State", "CA", "provinces", "canada_div");
}

function drawMap(title, region, resolution, div_id) {
  var data = google.visualization.arrayToDataTable(
    [[title, "Visitor code"]].concat(
      common_data.map(function(code) {
        return [code, 0];
      }),
      unique_first.map(function(code) {
        return [code, 1];
      }),
      unique_second.map(function(code) {
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

function renderNames() {
  var names_html = users.ulad.displayNames.en + ' vs. ' +  users.marie.displayNames.en;
  document.getElementById("names").innerHTML = names_html;
}

function renderCounters() {
  var counters_html = countCountries(users.ulad.countries) + ' vs. ' + countCountries(users.marie.countries);
  document.getElementById("numbers").innerHTML = counters_html;
}

function renderCountryList(id, countries) {
  for (var elem of countries) {
    var country_html = elem + " <img class='flag' src='flags-iso/" + elem + ".png'><br>";
    document.getElementById(id).innerHTML += country_html;
  }
}

function renderCountryLists() {
  renderCountryList("common", common_data);
  renderCountryList("unique_first", unique_first);
  renderCountryList("unique_second", unique_second);
}


function countCountries(countries) {
  var country_set = new Set();
  for (var country of countries) {
    country_set.add(country.split('-')[0]);
  }
  return country_set.size;
}
