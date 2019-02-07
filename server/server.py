import pandas as pd
from shapely.geometry import Point, shape
import mysql.connector
from flask import Flask
from flask import render_template
import json

app = Flask(__name__)

config = {
  'user': 'root',
  'password': 'root',
  'unix_socket': '/Applications/MAMP/tmp/mysql/mysql.sock',
  'database': 'mobile_china',
  'raise_on_warnings': True,
}
link = mysql.connector.connect(**config)

@app.route("/")
def index():
    return 'index'
    # render_template("index.html")

@app.route("/data")
def get_data():
    mycursor = link.cursor()
    print(mycursor, 'before SQL')
    mycursor.execute("SELECT * FROM gender_age_train LEFT JOIN events ON gender_age_train.device_id = events.device_id LEFT JOIN phone_brand_device_model ON gender_age_train.device_id = phone_brand_device_model.device_id LIMIT 10")
    print('after sql')

    SELECT * FROM gender_age_train INNER JOIN events ON gender_age_train.device_id = events.device_id INNER JOIN phone_brand_device_model ON gender_age_train.device_id = phone_brand_device_model.device_id LIMIT 10
    # myresult = mycursor.fetchall()

    # resultArray = []
    # print('before loop')
    # for entry in myresult:
    #   resultArray.append(entry)

    return 'data works'

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)