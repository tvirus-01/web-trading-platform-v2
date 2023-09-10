import sqlite3

conn = sqlite3.connect("e:\/pydocs\/trading-platform-v2\/currency.db")

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="db_trading_platform_v2"
)
my_cursor = mydb.cursor()
