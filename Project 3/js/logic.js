// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
var layers = {
    O3: new L.LayerGroup(),
    PM25: new L.LayerGroup(),
    PM10: new L.LayerGroup(),
  };

// Create the map with our layers.
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [
      layers.O3,
      layers.PM25,
      layers.PM10,
    ]
  });

// Add our "streetmap" tile layer to the map.
streetmap.addTo(myMap);

let link = "Resources/openaq.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {

    function circleColor(value, parameter) {
        if (parameter === "O3" && value >= 0.097) return "red";
        else if (parameter === "O3" && value >= 0.077 && value <= 0.097) return "orange";
        else if (parameter === "O3" && value >= 0.061 && value <= 0.076) return "yellow";
        else if (parameter === "O3" && value >= 0 && value <= 0.06) return "green";
        else if (parameter === "PM2.5" && value >= 57) return "red";
        else if (parameter === "PM2.5" && value >= 36 && value <= 57) return "orange";
        else if (parameter === "PM2.5" && value >= 13 && value <= 35) return "yellow";
        else if (parameter === "PM2.5" && value >= 0 && value <= 13) return "green";
        else if (parameter === "PM10" && value >= 254) return "red";
        else if (parameter === "PM10" && value >= 156 && value <= 254) return "orange";
        else if (parameter === "PM10" && value >= 56 && value <= 154) return "yellow";
        else if (parameter === "PM10" && value < 56) return "green";
        else return "grey";
    }

    function O3Filter(feature) {
        if (feature.properties.measurements_parameter === "O3") return true
    }

    function PM25Filter(feature) {
        if (feature.properties.measurements_parameter === "PM2.5") return true
    }

    function PM10Filter(feature) {
        if (feature.properties.measurements_parameter === "PM10") return true
    }
    
    // Creating a GeoJSON layer with the retrieved data
    let mapdata = L.geoJson(data, {
        pointToLayer: function (feature, location) {
            return L.circleMarker(location, {
                radius: 15,
                color: "#000",
                fillColor: circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h1>${feature.properties.location}</h1> <h3>${feature.properties.city}</h3> <hr>
            <h2>Pollutant: ${feature.properties.measurements_parameter} <br>
            Value: ${feature.properties.measurements_value} ${feature.properties.measurements_unit} </h2>
            <h3> Updated: ${feature.properties.measurements_lastupdated}</h3>`);
        }
    })

    let O3mapdata = L.geoJson(data, {filter: O3Filter,
        pointToLayer: function (feature, location) {
            return L.circleMarker(location, {
                radius: 15,
                color: "#000",
                fillColor: circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h1>${feature.properties.location}</h1> <h3>${feature.properties.city}</h3> <hr>
            <h2>Pollutant: ${feature.properties.measurements_parameter} <br>
            Value: ${feature.properties.measurements_value} ${feature.properties.measurements_unit} </h2>
            <h3> Updated: ${feature.properties.measurements_lastupdated}</h3>`);
        }
    })
    
    let PM25mapdata = L.geoJson(data, {filter: PM25Filter,
        pointToLayer: function (feature, location) {
            return L.circleMarker(location, {
                radius: 15,
                color: "#000",
                fillColor: circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h1>${feature.properties.location}</h1> <h3>${feature.properties.city}</h3> <hr>
            <h2>Pollutant: ${feature.properties.measurements_parameter} <br>
            Value: ${feature.properties.measurements_value} ${feature.properties.measurements_unit} </h2>
            <h3> Updated: ${feature.properties.measurements_lastupdated}</h3>`);
        }
    })

    let PM10mapdata = L.geoJson(data, {filter: PM10Filter,
        pointToLayer: function (feature, location) {
            return L.circleMarker(location, {
                radius: 15,
                color: "#000",
                fillColor: circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<h1>${feature.properties.location}</h1> <h3>${feature.properties.city}</h3> <hr>
            <h2>Pollutant: ${feature.properties.measurements_parameter} <br>
            Value: ${feature.properties.measurements_value} ${feature.properties.measurements_unit} </h2>
            <h3> Updated: ${feature.properties.measurements_lastupdated}</h3>`);
        }
    })

    //Adding a legend
    var legend = L.control({ position: 'bottomright' })
    legend.onAdd = function (myMap) {
      var div = L.DomUtil.create('div', 'info legend')
      var limits = ["Good", "Moderate", "Poor", "Very Poor"];
      var colors = ["green", "yellow", "orange", "red"];
      var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[3] + '</div> \
            <div class="mid1">' + limits[1] + '</div> \
            <div class="mid2">' + limits[2] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
    
    legend.addTo(myMap)

// Create an overlays object to add to the layer control.
var overlays = {
    "All data": mapdata,
    "O3": O3mapdata,
    "PM2.5": PM25mapdata,
    "PM10": PM10mapdata
  };

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(myMap);
});