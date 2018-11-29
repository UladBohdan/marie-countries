var common_data = intersection(users.ulad.countries, users.marie.countries);
var unique_first = difference(users.ulad.countries, common_data);
var unique_second = difference(users.marie.countries, common_data);

// google.charts.load("current", {
//   packages: ["geochart"]
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  // mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
// });
// google.charts.setOnLoadCallback(renderPage);

mapboxgl.accessToken = 'pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-99.9, 41.5],
    zoom: 2
});

map.on('load', function() {

    map.addSource('belarus', { // provinces
        type: 'vector',
        url: 'mapbox://uladbohdan.9w37et5v'
    });

    map.addSource('belarus2', { // countries
        type: 'vector',
        url: 'mapbox://uladbohdan.88dx6uwr'
    });

    var all_regions = {};

    unique_first.forEach(function(country) {
      normalized = country;
      // if (country in countryToCodeMap) {
      //   normalized = countryToCodeMap[country]
      // }
      all_regions[normalized] = ["rgb", 78, 179, 211];
    })
    unique_second.forEach(function(country) {
      normalized = country;
      // if (country in countryToCodeMap) {
      //   normalized = countryToCodeMap[country]
      // }
      all_regions[normalized] = ["rgb", 254, 217, 118]
    })
    common_data.forEach(function(country) {
      normalized = country;
      // if (country in countryToCodeMap) {
      //   normalized = countryToCodeMap[country]
      // }
      all_regions[normalized] = ["rgb", 204, 51, 51]
    })

    var all1 = ["match", ["get", "iso_3166_2"]]
    var all2 = ["match", ["get", "NAME"]]
    for (var country in all_regions) {
      all1.push(country, all_regions[country])
      all2.push(country, all_regions[country])
    }
    all1.push(["rgba", 0, 0, 0, 0])
    all2.push(["rgba", 0, 0, 0, 0])

    // Add layer from the vector tile source with data-driven style
    map.addLayer({
        "id": "states-join",
        "type": "fill",
        "source": "belarus",
        "source-layer": "ne_10m_admin_1_states_provinc-2kzgpu",
        "paint": {
            "fill-color": all1
        }
    });

    map.addLayer({
        "id": "states-join2",
        "type": "fill",
        "source": "belarus2",
        "source-layer": "ne_10m_admin_0_map_units-1x8xkc",
        "paint": {
            "fill-color": all2
        }
    }, 'waterway-label');

    renderNames();
    renderCounters();
    renderCountryLists();
});

// function renderPage() {
//   // drawMaps();
//   renderNames();
//   renderCounters();
//   renderCountryLists();
// }

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
    var country = getCountry(elem);
    if (country.length != 2) {
      country = countryToCodeMap[elem];
    }
    var country_html = elem + " <img class='flag' src='flags-iso/" + country + ".png'><br>";
    document.getElementById(id).innerHTML += country_html;
  }
}

function renderCountryLists() {
  renderCountryList("common", common_data);
  renderCountryList("unique_first", unique_first);
  renderCountryList("unique_second", unique_second);
}

function getCountry(country_or_province) {
  return country_or_province.split('-')[0]
}

function countCountries(countries) {
  var country_set = new Set();
  for (var country of countries) {
    country_set.add(getCountry(country));
  }
  return country_set.size;
}
