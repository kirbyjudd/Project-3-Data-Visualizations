#!/usr/bin/env python3
import sqlite3
import pandas as pd

from pathlib import Path

database_path = "Resources/airquality_db.sqlite"
Path(database_path).touch()

conn = sqlite3.connect(database_path)
c = conn.cursor()

c.execute('''CREATE TABLE openaq ( [Country Code] varchar(5), [City] varchar(100), [Location] varchar(100), [Coordinates] float, [Pollutant] varchar(10), [Source Name] varchar(10), [Unit] varchar(10), [Value] float, [Last Updated] datetime, [Country Label] varchar(50))''')
csv_openaq = pd.read_csv("Resources/openaq.csv")
csv_openaq.to_sql("openaq", conn, if_exists='append', index=False)

# c.execute('''CREATE TABLE aqi_countries ( Rank int primary key, [Country_Region] varchar(100), [2021] float, [2020] float, [2019] float, [2018] float, Population int)''')
# csv_aqi_countries = pd.read_csv("Resources/AIR QUALITY INDEX- top countries.csv")
# csv_aqi_countries.to_sql("aqi_countries", conn, if_exists='append', index=False)

# c.execute('''CREATE TABLE cities ( geonameid int primary key, asciiname varchar(255), latitude float, longitude float, [country code] varchar(5), population int, dem int, timezone varchar(100))''')
# csv_cities = pd.read_csv("Resources/cities15000_clean.csv", encoding='latin-1')
# csv_cities.to_sql("cities", conn, if_exists='append', index=False)

conn.close()
