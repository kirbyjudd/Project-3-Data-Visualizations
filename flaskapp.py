# Import the necessary modules
from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS, cross_origin

# Create a Flask application
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Define the route to fetch all restaurants
@app.route('/aqi', methods=['GET'])
def get_aqi():
    try:
        # Establish a connection to the database
        connection = psycopg2.connect(
            host='localhost',
            port=5432,
            database='air_quality',
            user='postgres',
            # update to your PG Admin server password
            password='12345'
        )
        
        # Create a cursor object to execute SQL queries
        cursor = connection.cursor()

        # Execute the SQL query to fetch all restaurants
        cursor.execute("SELECT * FROM aqi")

        # Fetch all rows from the result set
        aqi_data = cursor.fetchall()
        print ( aqi_data)
        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Convert the restaurants to a list of dictionaries
        aqi_data_list = []
        for aqi_data in aqi_data:
            restaurant_dict = {
                'COL_ID': aqi_data[0],
                'Date_Monitored': aqi_data[1],
                'Data_Source ': aqi_data[2],
                'Site_ID': aqi_data[3],
                'POC': aqi_data[4],
                'DailyPM2_5_PM10_Ozone_conc': aqi_data[5],
                'UNITS': aqi_data[6],
                'DAILY_AQI_VALUE': aqi_data[7],
                'Site_Name': aqi_data[8],
                'DAILY_OBS_COUNT': aqi_data[9],
                'PERCENT_COMPLETE': aqi_data[10],
                'AQS_PARAMETER_CODE': aqi_data[11],
                'AQS_PARAMETER_DESC': aqi_data[12],
                'CBSA_CODE': aqi_data[13],
                'CBSA_NAME': aqi_data[14],
                'STATE_CODE': aqi_data[15],
                'STATE_NAME': aqi_data[16],
                'COUNTY_CODE': aqi_data[17],
                'COUNTY': aqi_data[18],
                'SITE_LATITUDE': aqi_data[19],
                'SITE_LONGITUDE': aqi_data[20]
            }
            aqi_data_list.append(restaurant_dict)

        # Return the restaurants as JSON response
        return jsonify( aqi_data_list)

    except (Exception, psycopg2.Error) as error:
        return jsonify({'error': str(error)})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)