let myMap = L.map("map", {
    center: [40.5008, -74.4474],
    zoom: 11
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
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
    
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
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
    }).addTo(myMap);
});