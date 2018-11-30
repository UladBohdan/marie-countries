var common_data = intersection(users.ulad.countries, users.marie.countries);
var unique_first = difference(users.ulad.countries, common_data);
var unique_second = difference(users.marie.countries, common_data);

mapboxgl.accessToken = 'pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [22.7, 49.3],
    zoom: 2,
    minZoom: 2,
    maxZoom: 4,
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

function renderNames() {
  var names_html = users.ulad.displayNames.en + ' vs. ' +  users.marie.displayNames.en;
  document.getElementById("names").innerHTML = names_html;
}

function renderCounters() {
  var counters_html = countCountries(users.ulad.countries) + ' vs. ' + countCountries(users.marie.countries);
  document.getElementById("numbers").innerHTML = counters_html;
}

function renderCountryList(id, countries) {
  var aggregated = {}
  for (var elem of countries) {
    var country = getCountry(elem);
    if (!(country in aggregated)) {
      aggregated[country] = [];
    }
    aggregated[country].push(getProvince(elem));
  }
  for (var elem in aggregated) {
    var country_code = getCountryCode(elem);
    var country_html = codeToENMap[country_code];
    if (aggregated[elem].length > 1 || aggregated[elem][0] !== '') {
      country_html += ': <small>';
      for (province of aggregated[elem]) {
        country_html += province + ', ';
      }
      country_html = country_html.slice(0, -2) + '</small>';
    }
    var flag_html = " <img class='flag' src='flags-iso/" + country_code + ".png'><br>";
    country_html += flag_html
    document.getElementById(id).innerHTML += country_html;
  }
}

function renderCountryLists() {
  renderCountryList("common", common_data);
  renderCountryList("unique_first", unique_first);
  renderCountryList("unique_second", unique_second);
}

function getCountry(country_or_province) {
  return country_or_province.split('-')[0];
}

function getProvince(country_or_province) {
  name_parts = country_or_province.split('-');
  if (name_parts.length > 1) {
    return name_parts[1];
  }
  return '';
}

function getCountryCode(country_or_province) {
  var country = getCountry(country_or_province);
  if (country.length != 2) {
    country = countryToCodeMap[country_or_province];
  }
  return country;
}

function countCountries(countries) {
  var country_set = new Set();
  for (var country of countries) {
    country_set.add(getCountry(country));
  }
  return country_set.size;
}
