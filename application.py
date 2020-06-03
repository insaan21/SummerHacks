from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL

app = Flask(__name__)

#configure db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password123'
app.config['MYSQL_DB'] = 'comments'

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def render_index():
    if request.method == 'POST':
        #fetch form data
        userDetails = request.form
        name = userDetails['name']
        message = userDetails['message']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO comments(name, message) VALUES(%s, %s)", (name, message))
        mysql.connection.commit()
        cur.close
        return redirect ('/commentsection')
    return render_template('index.html')

@app.route('/commentsection')
def commentsection ():
    cur = mysql.connection.cursor()
    resultvalue = cur.execute("SELECT * FROM comments")
    if resultvalue > 0:
        userDetails = cur.fetchall()
        return render_template("comments.html", userDetails=userDetails)
    else:
        return render_template("nocomments.html")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
