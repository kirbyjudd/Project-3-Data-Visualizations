// Set the url variables
const city_region = "http://127.0.0.1:5000/api/v1.0/city-region";

const url = "http://127.0.0.1:5000/api/v1.0/data";
const cityDropdown = "http://127.0.0.1:5000/api/v1.0/dropdown_region"
const O3url = "http://127.0.0.1:5000/api/v1.0/O3regionAvg";
const PM25url = "http://127.0.0.1:5000/api/v1.0/PM25regionAvg";
const PM10url = "http://127.0.0.1:5000/api/v1.0/PM10regionAvg";

const O3usAvg_url = "http://127.0.0.1:5000/api/v1.0/O3usAvg";
const PM25usAvg_url = "http://127.0.0.1:5000/api/v1.0/PM25usAvg";
const PM10usAvg_url = "http://127.0.0.1:5000/api/v1.0/PM10regionAvg";

// Fetch the JSON data and console log it
Promise.all([
  d3.json(url),
  d3.json(O3url),
  d3.json(PM25url),
  d3.json(PM10url),
  d3.json(O3usAvg_url),
  d3.json(PM25usAvg_url),
  d3.json(PM10usAvg_url),
]).then(function([data, O3regionAvg, PM25regionAvg, PM10regionAvg, O3usAvg, PM25usAvg, PM10usAvg]) {
    console.log(data, O3regionAvg, PM25regionAvg, PM10regionAvg, O3usAvg, PM25usAvg, PM10usAvg)

let O3Chart;
let PM25Chart;
let PM10Chart;
    
// Render the chart to the div tag with the id of "myChart".
function barChart(id) {
  O3filteredAvg = O3regionAvg.filter(row => row.City == id);
  PM25filteredAvg = PM25regionAvg.filter(row => row.City == id);
  PM10filteredAvg = PM10regionAvg.filter(row => row.City == id);
  O3usfilteredAvg = O3usAvg.filter(row => row.City == id);
  PM25usfilteredAvg = PM25usAvg.filter(row => row.City == id);
  PM10usfilteredAvg = PM10usAvg.filter(row => row.City == id);

  
if (O3Chart){
  O3Chart.destroy();
}
    O3Chart = new Chart(
      document.getElementById('myChartO3'),
      {
        type: 'bar',
        data: {
          labels: ["O3 (ppm)"],
          datasets: [
            {
              label: [O3filteredAvg[0].City],
              data: [O3filteredAvg[0].Value]
            },
            {
              label: "US Average",
              data: [O3usAvg[0].Value]
            }
          ]
        }
      }
    );

if (PM25Chart){
  PM25Chart.destroy();
}
    PM25Chart = new Chart(
      document.getElementById('myChartPM25'),
      {
        type: 'bar',
        data: {
          labels: ["PM2.5 (µg/m³)"],
          datasets: [
            {
              label: [PM25filteredAvg[0].City],
              data: [PM25filteredAvg[0].Value]
            },
            {
              label: "US Average",
              data: [PM25usAvg[0].Value]
            }
          ]
        }
      }
    );

if (PM10Chart){
  PM10Chart.destroy();
}
    PM10Chart = new Chart(
      document.getElementById('myChartPM10'),
      {
        type: 'bar',
        data: {
          labels: ["PM10 (µg/m³)"],
          datasets: [
            {
              label: [PM10filteredAvg[0].City],
              data: [PM10filteredAvg[0].Value]
            },
            {
              label: "US Average",
              data: [PM10usAvg[0].Value]
            }
          ]
        }
      }
    );
}
document.getElementById("selDataset").addEventListener("change", function () {barChart(document.getElementById("selDataset").value)});

});

function init() {
  // variable for selector  
  let selector = d3.select("#selDataset");
  
  d3.json(cityDropdown).then(function(data) {
      let names = data;
      // Adding all id #'s to dropdown  
      names.forEach(element => {
          // console.log(element.City);
          selector.append("option").text(element).property("value", element);            
      });
      let idSelect = names[0];
      // charts(idSelect);
  });
};

// Update the dashboard when id option is changed
function optionChanged(id) {
  barChart(id);
}
init();