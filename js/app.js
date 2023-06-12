// Set the url variable
const city_region = "http://127.0.0.1:5000/api/v1.0/city-region";
const url = "http://127.0.0.1:5000/api/v1.0/data";
const O3url = "http://127.0.0.1:5000/api/v1.0/O3regionAvg";
const PM25url = "http://127.0.0.1:5000/api/v1.0/PM25regionAvg";
const PM10url = "http://127.0.0.1:5000/api/v1.0/PM10regionAvg";

// Fetch the JSON data and console log it
Promise.all([
  d3.json(url),
  d3.json(O3url),
  d3.json(PM25url),
  d3.json(PM10url)
]).then(function([data, O3regionAvg, PM25regionAvg, PM10regionAvg]) {
    console.log(data, O3regionAvg, PM25regionAvg, PM10regionAvg)

  // Slice the first 10 objects for plotting.
  data = data.slice(0, 10);
  O3regionAvg = O3regionAvg.slice(0, 10);
  PM25data = PM25regionAvg.slice(0, 10);
  PM10data = PM10regionAvg.slice(0, 10);

    // Data
    let chartdata = data.map(row => row.Value);
    let chartO3data = O3regionAvg.map(row => row.Value);
    let chartPM25data = PM25regionAvg.map(row => row.Value);
    let chartPM10data = PM10regionAvg.map(row => row.Value);
    
    // Render the chart to the div tag with the id of "myChart".
    new Chart(
      document.getElementById('myChart'),
      {
        type: 'bar',
        data: {
          labels: O3regionAvg.map(row => row.City),
          datasets: [
            {
              label: 'Pollutant Average Value',
              data: chartO3data
            }
          ]
        }
      }
    );

        // Render the chart to the div tag with the id of "myChart".
        new Chart(
          document.getElementById('myChart2'),
          {
            type: 'pie',
            data: {
              labels: O3regionAvg.map(row => row.City),
              datasets: [
                {
                  label: 'Pollutant Value',
                  data: chartO3data
                }
              ]
            }
          }
        );
});
