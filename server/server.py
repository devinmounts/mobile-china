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
    return render_template("index.html")

@app.route("/data")
def get_data():
    
    return "Get data works!"

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)