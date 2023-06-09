import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_cors import CORS
from flask import Flask, jsonify
from itertools import groupby



#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/airquality_db.sqlite", echo=False)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save a reference to the openaq table as `data`
data = Base.classes.openaq

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/pollutants<br/>"
        f"/api/v1.0/city-region<br/>"
        f"/api/v1.0/data<br/>"
        f"/api/v1.0/O3data<br/>"
        f"/api/v1.0/PM25data<br/>"
        f"/api/v1.0/PM10data<br/>"
        f"/api/v1.0/O3regionAvg<br/>"
        f"/api/v1.0/PM25regionAvg<br/>"
        f"/api/v1.0/PM10regionAvg<br/>"
        f"/api/v1.0/O3usAvg<br/>"
        f"/api/v1.0/PM25usAvg<br/>"
        f"/api/v1.0/PM10usAvg<br/>"
        f"/api/v1.0/dropdown_region<br/>"
    )


@app.route("/api/v1.0/pollutants")
def pollutants():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all city names"""
    # Query all distinct pollutants
    results = session.query(data.Pollutant).distinct().all()

    session.close()

    # Convert list of tuples into normal list
    pollutant_names = list(np.ravel(results))
    
    return jsonify(pollutant_names)


@app.route("/api/v1.0/city-region")
def city():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all city names"""
    # Query all distinct city-regions
    results = session.query(data.City).distinct().all()

    session.close()

    # Convert list of tuples into normal list
    city_names = list(np.ravel(results))
    
    return jsonify(city_names)


@app.route("/api/v1.0/data")
def openaq():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all database data"""
    # Query all data
    results = session.query(data.City, data.Location, data.Coordinates, data.Pollutant, data.Unit, data.Value).all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_locations
    all_locations = []
    for City, Location, Coordinates, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Location"] = Location
        location_dict["Coordinates"] = Coordinates
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_locations.append(location_dict)

    return jsonify(all_locations)

@app.route("/api/v1.0/O3data")
def O3():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of O3 data"""
    # Query all data filtering for O3 only
    results = session.query(data.City, data.Location, data.Coordinates, data.Pollutant, data.Unit, data.Value).filter(data.Pollutant == 'O3').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_O3
    all_O3 = []
    for City, Location, Coordinates, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Location"] = Location
        location_dict["Coordinates"] = Coordinates
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_O3.append(location_dict)

    return jsonify(all_O3)

@app.route("/api/v1.0/PM25data")
def PM25():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM2.5 data"""
    # Query all data filtering for PM2.5 only
    results = session.query(data.City, data.Location, data.Coordinates, data.Pollutant, data.Unit, data.Value).filter(data.Pollutant == 'PM2.5').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_PM25
    all_PM25 = []
    for City, Location, Coordinates, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Location"] = Location
        location_dict["Coordinates"] = Coordinates
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM25.append(location_dict)

    return jsonify(all_PM25)

@app.route("/api/v1.0/PM10data")
def PM10():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM10 data"""
    # Query all data filtering for PM10 only
    results = session.query(data.City, data.Location, data.Coordinates, data.Pollutant, data.Unit, data.Value).filter(data.Pollutant == 'PM10').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_PM10
    all_PM10 = []
    for City, Location, Coordinates, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Location"] = Location
        location_dict["Coordinates"] = Coordinates
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM10.append(location_dict)

    return jsonify(all_PM10)

@app.route("/api/v1.0/O3regionAvg")
def O3regionAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of O3 data filtering for average value"""
    # Query all data filtering for O3 only and grouping by city-region ordered by descending values
    results = session.query(data.City, data.Pollutant, data.Unit, func.avg(data.Value)).group_by(data.City).order_by(func.avg(data.Value).desc()).filter(data.Pollutant == 'O3').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_O3regionAvg
    all_O3regionAvg = []
    for City, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_O3regionAvg.append(location_dict)

    return jsonify(all_O3regionAvg)

@app.route("/api/v1.0/PM25regionAvg")
def PM25regionAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM2.5 data filtering for average value"""
    # Query all data filtering for PM2.5 only and grouping by city-region ordered by descending values
    results = session.query(data.City, data.Pollutant, data.Unit, func.avg(data.Value)).group_by(data.City).order_by(func.avg(data.Value).desc()).filter(data.Pollutant == 'PM2.5').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_PM2.5regionAvg
    all_PM25regionAvg = []
    for City, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM25regionAvg.append(location_dict)

    return jsonify(all_PM25regionAvg)

@app.route("/api/v1.0/PM10regionAvg")
def PM10regionAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM10 data filtering for average value"""
    # Query all data filtering for PM10 only and grouping by city-region ordered by descending values
    results = session.query(data.City, data.Pollutant, data.Unit, func.avg(data.Value)).group_by(data.City).order_by(func.avg(data.Value).desc()).filter(data.Pollutant == 'PM10').all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_PM10regionAvg
    all_PM10regionAvg = []
    for City, Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["City"] = City
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM10regionAvg.append(location_dict)

    return jsonify(all_PM10regionAvg)

@app.route("/api/v1.0/O3usAvg")
def O3usAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of O3 US average value"""
    # Query data and find O3 US Avg
    results = session.query(data.Pollutant, data.Unit, func.avg(data.Value)).filter(data.Pollutant == 'O3').all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_O3usAvg
    all_O3usAvg = []
    for Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_O3usAvg.append(location_dict)
    
    return jsonify(all_O3usAvg)

@app.route("/api/v1.0/PM25usAvg")
def PM25usAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM2.5 US average value"""
    # Query data and find PM2.5 US Avg
    results = session.query(data.Pollutant, data.Unit, func.avg(data.Value)).filter(data.Pollutant == 'PM2.5').all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_PM25usAvg
    all_PM25usAvg = []
    for Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM25usAvg.append(location_dict)
    
    return jsonify(all_PM25usAvg)

@app.route("/api/v1.0/PM10usAvg")
def PM10usAvg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of PM10 US average value"""
    # Query data and find PM10 US Avg
    results = session.query(data.Pollutant, data.Unit, func.avg(data.Value)).filter(data.Pollutant == 'PM10').all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_PM10usAvg
    all_PM10usAvg = []
    for Pollutant, Unit, Value in results:
        location_dict = {}
        location_dict["Pollutant"] = Pollutant
        location_dict["Unit"] = Unit
        location_dict["Value"] = Value
        all_PM10usAvg.append(location_dict)
    
    return jsonify(all_PM10usAvg)

@app.route("/api/v1.0/dropdown_region")
def dropdown_region():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all distinct city-region names for dropdown selector"""
    # Query all distinct city-regions for dropdown selector
    results = session.query(data.City).distinct().order_by(data.City).filter(data.Pollutant == 'O3').all()

    session.close()

    # Convert list of tuples into normal list
    dropdown_names = list(np.ravel(results))
    
    return jsonify(dropdown_names)

if __name__ == '__main__':
    app.run(debug=True)
