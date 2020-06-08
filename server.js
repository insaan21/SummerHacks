var fs = require('fs');
var data = fs.readFileSync('comments.json')
var comments = JSON.parse(data)
var express = require('express')
var app = express();
var cors = require('cors')
app.use(cors())
var server = app.listen(3000);
app.get('/add/:comment/:name?', cors(), addComment)

function addComment(request, response){
   var data = request.params; 
   var comment = data.comment
   var name = data.name
   comments[comment] = name;
   console.log(comments);
   var add = JSON.stringify(comments, null, 2)
    fs.writeFile('comments.json', add, 'utf8', finished)
    function finished(err){
        console.log('all set.');
        var reply = {
            comment: comment,
            name: name,
            status: "success"
        }
        response.send(reply)
    }
app.get('/all',cors(), sendAll);
function sendAll(request, response){
    console.log(comments)
    response.send(comments);
}
    
}