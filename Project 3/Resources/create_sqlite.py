#!/usr/bin/env python3
import sqlite3
import pandas as pd

from pathlib import Path

database_path = "Resources/airquality_db.sqlite"
Path(database_path).touch()

conn = sqlite3.connect(database_path)
c = conn.cursor()

c.execute('''CREATE TABLE aqi_cities ( Rank int primary key, City varchar(100), [2021] float, [JAN(2021)] float, [FEB(2021)] float, [MAR(2021)] float, [APR(2021)] float, [MAY(2021)] float, [JUN(2021)] float, [JUL(2021)] float, [AUG(2021)] float, [SEP(2021)] float, [OCT(2021)] float, [NOV(2021)] float, [DEC(2021)] float, [2020] float, [2019] float, [2018] float, [2017] float)''')
csv_aqi_cities = pd.read_csv("Resources/AIR QUALITY INDEX (by cities) - IQAir.csv")
csv_aqi_cities.to_sql("aqi_cities", conn, if_exists='append', index=False)

c.execute('''CREATE TABLE aqi_countries ( Rank int primary key, [Country/Region] varchar(100), [2021] float, [2020] float, [2019] float, [2018] float, Population int)''')
csv_aqi_countries = pd.read_csv("Resources/AIR QUALITY INDEX- top countries.csv")
csv_aqi_countries.to_sql("aqi_countries", conn, if_exists='append', index=False)

c.execute('''CREATE TABLE cities ( geonameid int primary key, asciiname varchar(255), latitude float, longitude float, [country code] varchar(5), population int, dem int, timezone varchar(100))''')
csv_cities = pd.read_csv("Resources/cities15000_clean.csv", encoding='latin-1')
csv_cities.to_sql("cities", conn, if_exists='append', index=False)

conn.close()
