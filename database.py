import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password123",
    database="comments"
)

mycursor = mydb.cursor()

mycursor.execute("DELETE FROM comments WHERE name = 'Sapna'")

mydb.commit()