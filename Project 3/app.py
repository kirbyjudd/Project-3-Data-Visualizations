import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


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
        f"/api/v1.0/data"
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
    # Query all distinct pollutants
    results = session.query(data.City).distinct().all()

    session.close()

    # Convert list of tuples into normal list
    city_names = list(np.ravel(results))
    
    return jsonify(city_names)


@app.route("/api/v1.0/data")
def openaq():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of country data including the name and population of each country"""
    # Query all countries
    results = session.query(data.City, data.Location, data.Coordinates, data.Pollutant, data.Unit, data.Value).all()
     
    session.close()

    # Create a dictionary from the row data and append to a list of all_countries
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


if __name__ == '__main__':
    app.run(debug=True)
