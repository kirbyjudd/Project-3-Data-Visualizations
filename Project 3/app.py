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

# Save a reference to the cities table as `Cities` and countries table as `Countries`
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
        # f"/api/v1.0/countries"
    )


@app.route("/api/v1.0/pollutants")
def cities():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all city names"""
    # Query all pollutants
    results = session.query(data).all()

    session.close()

    # Convert list of tuples into normal list
    pollutant_names = list(np.ravel(results))
    
    return jsonify(pollutant_names)


# @app.route("/api/v1.0/countries")
# def countries():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of country data including the name and population of each country"""
#     # Query all countries
#     results = session.query(Countries.Country_Region, Countries.Population).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_countries
#     all_countries = []
#     for Country_Region, Population in results:
#         country_dict = {}
#         country_dict["Country"] = Country_Region
#         country_dict["Population"] = Population
#         all_countries.append(country_dict)

#     return jsonify(all_countries)


if __name__ == '__main__':
    app.run(debug=True)
