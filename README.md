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
Go to chrome://extensions.\
Put yourself in developer mode.\
Click on load unpacked extensions and load the whole summerhacks folder.\ 
The chrome extension icon should be there with the others.

To test API
```
POST Request: 
http:localhost:5000/add

GET Requests:

get all : http:localhost:5000/get/all
get by id : http:localhost:5000/get/:commentID

PATCH Request: 

send friend request : http:localhost:5000/friends/sendFriendRequest
remove friend : http:localhost:5000/friends/removeFriend 
accept friend request : http:localhost:5000/friends/acceptFriendRequest
add like to a comment : http:localhost:5000/likes/addLike/:commentID/:userID 
check if user liked a comment : http:localhost:5000/likes/userLiked/:commentID/:userID 

DELETE Request:

http:localhost:5000/delete/:commentID
```

NOTE: To run this chrome extension you need certain private keys. Contact the developers for details regarding those keys.
