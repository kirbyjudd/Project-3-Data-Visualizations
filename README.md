# Air Quality in US Cities

##  Introduction

The purpose of this report is to analyze the air pollution data collected from cities in the USA, specifically focusing on the levels of PM2.5, PM10, and O3. Air pollution has become a significant concern due to its adverse effects on human health and the environment. The analysis aims to provide insights into the air quality status, identify potential sources of pollution, and propose strategies to mitigate the problem. 
The Air Quality Index (AQI) is a standardized measure used to assess and compare air pollution levels. It categorizes quality into specific ranges, from good to hazardous, providing an indication of the overall air quality.

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/pm_levels_updated.png)

##  Key Pollutants

> ### Particulate matter (PM2.5 and PM10)

Particulate matter refers to tiny particles suspended in the air. PM2.5 and PM10 are particles with diameters of 2.5 micrometers and 10 micrometers, respectively. These particles are hazardous when inhaled and can cause respiratory and cardiovascular problems. They can be emitted directly into the air from anthropogenic activities (industry, residential, agriculture, transport) and natural sources (forest fires, volcanic eruptions, etc.)

> ### Ground-level ozone (O3)

Ground-level ozone or the “bad” ozone forms in the air we breathe. It is created by chemical reactions between NOx (oxides of nitrogen produced by combustion) and volatile organic compounds (VOCs). Ground-level ozone comes from pollution emitted from cars, power plants, industrial boilers, refineries, and chemical plants. Ozone pollution can even come from paints, cleaners, motorized lawn equipment. For this reason, levels of ground-level ozone tend to be the highest near urban centers as opposed to rural areas.

##  Methodology 

* ### SQLite

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/SQLite.png)

* ### Python Flask

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/Flask1.png)

* ### Leaflet.js

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/Map.png)

* ### Charts.js

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/Charts.js.png)

## Analysis
* The regions with the highest average amount of Moderate to Very Poor O3 air pollution was located in and around Wisconsin, Chicago and Michigan
* Some of the lower O3 air polluted regions included the San Francisco/Sacramento region, and near the East and West Coast shorelines
* Because PM2.5 and PM10 air pollution is more dynamic than O3, it should usually be in the satisfactory range unless there has been a recent forest fire or other event that would increase particles in the air
* The California forest areas had some of the higher PM2.5 readings which could be attributed to forest fires in the area when the air readings were taken
### [Link to the web page](https://kirbyjudd.github.io/Project-3-Data-Visualizations/)

##  Solutions to tackle Air Pollution

* Improve domestic, industry and municipal waste management.
* Invest in energy-efficient power generation.
* Reduce agricultural waste incineration, forest fires and certain agro-forestry activities.
* Make greener and more compact cities with energy-efficient buildings.
* Provide universal access to clean, affordable fuels and technologies for cooking, heating and lighting.
* Build safe and affordable public transport systems, and pedestrian and cycle-friendly networks.

![alt_text](https://github.com/kirbyjudd/Project-3-Data-Visualizations/blob/main/Images/Solutions.png)

source : Word Health Organization (WHO)

## Limitations to the Data Set

* **_Limited Pollutant Variables:_** The dataset focus on specific pollutants such as particulate matter(PM2.5 and PM10) and ozone(O3), while excluding other pollutants. Analysing a limited set of pollutants may not provide a comprehensive understanding of the overall air quality or the interactions between different pollutants, which could impact public health or environmental implications;

* **_Seasonal Variations:_** The dataset covers data for only few months, which may not capture long-term variations of the pollutants values;

* **_Monitoring Stations Distribution:_** The dataset has uneven distribution of monitoring stations across the study area. Some regions have more monitoring stations, and other are underrepresented. 


##  Data Source

OpenAQ. (2023). Air Quality Data for USA Cities. Retrieved June 6, 2023 from https://docs.openaq.org/reference/latest_get_v2_latest_get

## Team  

Nema Aragones, Vincent DeScioli, Anita Gjurchinovska, Kirby Judd

