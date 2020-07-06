# SummerHacks
Freetail Hackers SummerHacks

Node modules needed:
```bash
npm install express
npm install cors
npm install mongoose
npm install body-parser
npm install passport
npm install dotenv
```
To start server

```bash
# cd to backend folder
npm start
```

To test chrome extension:
Go to chrome://extensions
Put yourself in developer mode.
Click on load unpacked extensions and load the whole summerhacks folder. 
The chrome extension icon should be there with the others.

To test API
```
POST Request: 
http:localhost:5000/add

GET Requests:

get all : http:localhost:5000/get/all
get by id : http:localhost:5000/get/:commentID

DELETE Request:

http:localhost:5000/delete/:commentID
```
