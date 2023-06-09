let myMap = L.map("map", {
    center: [40.5008, -74.4474],
    zoom : 11
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let link = "Resources/openaq.geojson"

// Getting our GeoJSON data
d3.json(link).then(function(data) {

    for (let i = 0; i < data.features.length; i++) {
        console.log(i);
        let unit = data.features[i].properties.measurements_unit;
        let value = data.features[i].properties.measurements_value;
        let location = data.features[i].properties.location;
        let city = data.features[i].properties.city;
        let parameter = data.features[i].properties.measurements_parameter;
        let updated = data.features[i].properties.measurements_lastupdated;
    

    function circleColor(value) {
        if (parameter == "O3" & value >=.097 ) return "red";
        else if (parameter == "O3" & value >= .077 & value < .097) return "orange";
        else if (parameter == "O3" & value >= .061 & value < .076) return "yellow";
        else if (parameter == "O3" & value >= 0 & value < .06) return "green";

        else if (parameter == "PM2.5" & value >= 57) return "red";
        else if (parameter == "PM2.5" & value >= 36 & value < 57) return "orange";
        else if (parameter == "PM2.5" & value >= 13 & value < 35) return "yellow";
        else if (parameter == "PM2.5" & value >= 0 & value < 13) return "green";

        else if (parameter == "PM10" & value >= 254) return "red";
        else if (parameter == "PM10" & value >= 156 & value < 254) return "orange";
        else if (parameter == "PM10" & value >= 56 & value < 154) return "yellow";
        else if (parameter == "PM10" & value >= 0 & value < 56) return "green";

        else return "grey"
    };

    var geojsonMarkerOptions = {
        radius: 15,
        color: "#000",
        fillColor: circleColor(value),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
};

    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: function (feature, location) {
            return L.circleMarker(location, geojsonMarkerOptions).bindPopup(`<h1>${feature.properties.location}</h1> <h3>${feature.properties.city}</h3> <hr> 
            <h2>Pollutant: ${feature.properties.measurements_parameter} <br>
            Value: ${feature.properties.measurements_value} ${feature.properties.measurements_unit} </h2>
            <h3> Updated: ${feature.properties.measurements_lastupdated}</h3>`);
        }
    }).addTo(myMap);
});