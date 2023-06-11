// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
var layers = {
    O3: new L.LayerGroup(),
    PM25: new L.LayerGroup(),
    PM10: new L.LayerGroup(),
    Good: new L.LayerGroup(),
    Satisfactory: new L.LayerGroup(),
    Moderate: new L.LayerGroup(),
    Poor: new L.LayerGroup(),
    VeryPoor: new L.LayerGroup(),
    Severe: new L.LayerGroup(),
  };

// Create the map with our layers.
var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [
      layers.O3,
      layers.PM25,
      layers.PM10,
      layers.Severe,
    ]
  });

// Add our "streetmap" tile layer to the map.
streetmap.addTo(myMap);

let link = "Resources/openaq.geojson";

// Getting our GeoJSON data
d3.json(link).then(function(data) {

    function circleColor(value, parameter) {
        if (parameter === "O3" && value > 0.117) return "purple";
        else if (parameter === "O3" && value > .96 && value <= .117) return "red";
        else if (parameter === "O3" && value > .076 && value <= .96) return "orange";
        else if (parameter === "O3" && value > .06 && value <= .076) return "yellow";
        else if (parameter === "O3" && value > .035 && value <= .06) return "lawngreen";
        else if (parameter === "O3" && value >= 0 && value <= .035) return "green";
        else if (parameter === "PM2.5" && value > 250) return "purple";
        else if (parameter === "PM2.5" && value > 120 && value <= 249) return "red";
        else if (parameter === "PM2.5" && value > 90 && value <= 120) return "orange";
        else if (parameter === "PM2.5" && value > 60 && value <= 90) return "yellow";
        else if (parameter === "PM2.5" && value > 30 && value <= 60) return "lawngreen";
        else if (parameter === "PM2.5" && value > -16 && value <= 30) return "green";
        else if (parameter === "PM10" && value > 430) return "purple";
        else if (parameter === "PM10" && value > 350 && value <= 430) return "red";
        else if (parameter === "PM10" && value > 250 && value <= 350) return "orange";
        else if (parameter === "PM10" && value > 100 && value <= 250) return "yellow";
        else if (parameter === "PM10" && value > 50 && value <= 100) return "lawngreen";
        else if (parameter === "PM10" && value > -16 && value <= 50) return "green";
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

    function purpleFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "purple") return true
    }

    function redFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "red") return true
    }

    function orangeFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "orange") return true
    }

    function yellowFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "yellow") return true
    }

    function lawngreenFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "lawngreen") return true
    }

    function greenFilter(feature) {
        if (circleColor(feature.properties.measurements_value, feature.properties.measurements_parameter) == "green") return true
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

    let purpleData = L.geoJson(data, {filter: purpleFilter,
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

    let redData = L.geoJson(data, {filter: redFilter,
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

    let orangeData = L.geoJson(data, {filter: orangeFilter,
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

    let yellowData = L.geoJson(data, {filter: yellowFilter,
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

    let lawngreenData = L.geoJson(data, {filter: lawngreenFilter,
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

    let greenData = L.geoJson(data, {filter: greenFilter,
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
      var limits = ["Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"];
      var colors = ["green", "lawngreen", "yellow", "orange", "red", "purple"];
      var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[5] + '</div> \
            <div class="mid1">' + limits[1] + '</div> \
            <div class="mid2">' + limits[2] + '</div> \
            <div class="mid3">' + limits[3] + '</div> \
            <div class="mid4">' + limits[4] + '</div></div>'

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
    "PM10": PM10mapdata,
    "Severe": purpleData,
    "Very Poor": redData,
    "Poor": orangeData,
    "Moderate": yellowData,
    "Satisfactory": lawngreenData,
    "Good": greenData,

  };

// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(myMap);
});
function init() {
    // variable for selector  
    let selector = d3.select("#selDataset");
    
    d3.json(url).then(function(data) {
        let names = data;
        // Adding all id #'s to dropdown  
        names.forEach(element => {
            // console.log(element.City);
            selector.append("option").text(element.City).property("value");            
        });
        let idSelect = names[0];
        // charts(idSelect);
    });
  };
  init();