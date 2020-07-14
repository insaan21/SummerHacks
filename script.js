//file that runs every time chrome extension is loaded





var currentUser = "";
var count = 0;
window.onload = function () {
    //checked if logged in 
    var loginRequest1 = new XMLHttpRequest();
    loginRequest1.open('GET', 'http://localhost:5000/profile');
    loginRequest1.onload = async function () {
        if (await loginRequest1.responseText == 'Not logged in') {
            chrome.tabs.create({ url: 'http://localhost:5000/auth/google' });
        }
    }
    loginRequest1.send();

    //get current user ID
    var loginRequest2 = new XMLHttpRequest();
    loginRequest2.open('GET', 'http:localhost:5000/profile');
    loginRequest2.onload = async function () {
        currentUser = await loginRequest2.responseText;
    }
    loginRequest2.send();

    //display all the comments currently on the page
    displayCommentsAtURL();
    displayUserComments();

    //when user makes a new comment
    document.getElementById('save').onclick = function () {
        var comment = document.getElementById('comment').value;
        var name = document.getElementById('name').value;
        var url = document.getElementById('url').value;
        var addComment = {
            "comment": comment,
            "url": url,
            "user": JSON.parse(currentUser),
            "date" : Date.now,
            "isReply" : false,
            "_id" : mongoObjectId() 
        }
        var request1 = new XMLHttpRequest();

        //add comment to database
        request1.open("POST", "http://localhost:5000/add");
        request1.setRequestHeader('Content-Type', 'application/json');
        request1.send(JSON.stringify(addComment));

        //displayNewComment
        const div = document.createElement('div');
        div.className = 'message123';
        div.id = addComment._id;
        console.log(div.id);
        const currentImage = document.createElement("IMG");
        currentImage.className = "userimage"  
        currentImage.src = addComment.user.thumbnail;     
        div.textContent = addComment.user.userName + ":" 
        const messagediv = document.createElement('div');
        const linebreak = document.createElement("br");
        messagediv.className = 'message321';
        messagediv.textContent = addComment.comment;
        var date1 = new Date(Date.now());
        var options = { month: 'long'};
        var month = new Intl.DateTimeFormat('en-US', options).format(date1);
        var day = date1.getDate();
        var year = date1.getFullYear();
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = month + " " + day + ", " + year;
        const replyButton = document.createElement("button");
        replyButton.className = "replybutton"
        replyButton.id = "newreplybutton" + count; 
        replyButton.value = addComment._id;
        console.log(replyButton.value);
        replyButton.textContent = "Reply";
        div.appendChild(currentImage);
        div.appendChild(messagediv);
        div.appendChild(replyButton);
        div.appendChild(date);
        div.appendChild(linebreak);
        document.body.appendChild(div);

        replyButton.onclick = function () {
            var commentid = this.value;
            var originalDiv = document.getElementById(commentid);
            var textBox = document.createElement('input');
            var submitButton = document.createElement('button');
            submitButton.textContent = "Submit";
            var newDiv = document.createElement('div');
            newDiv.appendChild(textBox);
            newDiv.appendChild(submitButton);
            insertAfter(newDiv,originalDiv);
            submitButton.addEventListener('click', function() {
            var text = document.createElement('div');
            text.textContent = textBox.value;
            var userName = document.createElement('div');
            userName.textContent = JSON.parse(currentUser).userName;
            var finalDiv = document.createElement('div');
            finalDiv.appendChild(userName);
            finalDiv.appendChild(text);
            insertAfter(finalDiv, originalDiv)
            newDiv.remove();
            var url = document.getElementById('url').value;
                    var reply = {
                        "comment": document.getElementById('inputText').textContent,
                        "url": url,
                        "user": JSON.parse(currentUser),
                        "isReply" : true,
                        "replyTo" : JSON.parse(currentUser).userName,
                        "_id" : mongoObjectId()
                    }
                    var replyRequest = new XMLHttpRequest();
                    replyRequest.open('POST', 'http://localhost:5000/add');
                    replyRequest.setRequestHeader('Content-Type', 'application/json');
                    replyRequest.send(JSON.stringify(reply));
                    var addReplyToParent = new XMLHttpRequest();
                    addReplyToParent.open('PATCH', 'http://localhost:5000/add/reply/' + commentid + '/' + reply._id);
                    addReplyToParent.send();
            });
        }
    }

    //logout
    document.getElementById('logout').onclick = function() {
        var logoutRequest = new XMLHttpRequest();
        logoutRequest.open('GET', 'http://localhost:5000/auth/logout');
        logoutRequest.send();
    }


}


//display all comments at URL 
const displayCommentsAtURL = () => {
    //alert('hello');
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://localhost:5000/get/all');
    request2.onload = function () {
        //alert('hello');
        const data = JSON.parse(request2.response);
        for (var i = 0; i < data.length; i++) {
            if (data[i].url == document.getElementById('url').value) {
                //alert(data.length);
                //alert(i);
                if(!data[i].isReply){
                 const div = document.createElement('div');
                div.id = data[i]._id;
                const userDiv = document.createElement('div');
                userDiv.className = 'message123';
                userDiv.textContent = data[i].user.userName 
                const messagediv = document.createElement('div');
                messagediv.className = 'message321';
                messagediv.textContent = data[i].comment;
                const currentImage = document.createElement("IMG");
                currentImage.className = 'userimage';
                currentImage.src = data[i].user.thumbnail;
                const date = document.createElement('div');
                date.className = 'date';
                var date1 = new Date(data[i].date);
                var options = { month: 'long'};
                var month = new Intl.DateTimeFormat('en-US', options).format(date1);
                var day = date1.getDate();
                var year = date1.getFullYear();
                date.textContent = month + " " + day + ", " + year;
                const linebreak = document.createElement("br");
                const replyButton = document.createElement("button");
                replyButton.className = "replybutton"
                replyButton.id = "replybutton" + data[i]._id;
                replyButton.value = data[i]._id
                replyButton.textContent = "Reply";
                //replyButton.onclick = addReply;
                //replyButton.onclick = logvalue;
                div.appendChild(currentImage);
                div.appendChild(userDiv);
                div.appendChild(messagediv);
                div.appendChild(replyButton);
                div.appendChild(date);
                div.appendChild(linebreak);
                document.body.appendChild(div);
                //console.log(data[i].replies);

                  
                replyButton.onclick = function () {
                    var commentid = this.value;
                    var originalDiv = document.getElementById(commentid);
                    console.log(originalDiv);
                    var textBox = document.createElement('input');
                    var submitButton = document.createElement('button');
                    submitButton.textContent = "Submit";
                    var newDiv = document.createElement('div');
                    newDiv.appendChild(textBox);
                    newDiv.appendChild(submitButton);
                    insertAfter(newDiv,originalDiv);
                    submitButton.addEventListener('click', function() {
                    var text = document.createElement('div');
                    text.id = "inputText";
                    text.textContent = textBox.value;
                    var userName = document.createElement('div');
                    userName.textContent = JSON.parse(currentUser).userName;
                    var finalDiv = document.createElement('div');
                    finalDiv.appendChild(userName);
                    finalDiv.appendChild(text);
                    insertAfter(finalDiv, originalDiv)
                    newDiv.remove();
                    var url = document.getElementById('url').value;
                    var userName = originalDiv.getElementsByClassName('message123');
                    var reply = {
                        "comment": document.getElementById('inputText').textContent,
                        "url": url,
                        "user": JSON.parse(currentUser),
                        "isReply" : true,
                        "replyTo" : {
                            "userName" : userName[0].textContent,
                            "_id" : commentid
                        },
                        "_id" : mongoObjectId()
                    }
                    var replyRequest = new XMLHttpRequest();
                    replyRequest.open('POST', 'http://localhost:5000/add');
                    replyRequest.setRequestHeader('Content-Type', 'application/json');
                    replyRequest.send(JSON.stringify(reply));
                    var addReplyToParent = new XMLHttpRequest();
                    addReplyToParent.open('PATCH', 'http://localhost:5000/add/reply/' + commentid + '/' + reply._id);
                    addReplyToParent.send();
                    

                    });
                }
            }
                


                if(data[i].replies.length != 0){
                    //console.log('hello');
                    var replies = [];
                    var getReplies = new XMLHttpRequest();
                    getReplies.open('GET', 'http://localhost:5000/get/allReplies/' + data[i]._id, false);
                    getReplies.send();
                    if(getReplies.status == 200){
                        replies = JSON.parse(getReplies.response);
                    }
                    console.log(replies);
                    for (var j = replies.length-1; j>= 0; j--) {
                        //const reply = JSON.parse(getReply.response);
                        //console.log(reply);
                        var reply = replies[j];
                        var replyDiv = document.createElement('div');
                        replyDiv.id = reply._id;
                        const userDiv1 = document.createElement('div');
                        userDiv1.className = 'message123';
                        userDiv1.textContent = reply.user.userName 
                        const messagediv1 = document.createElement('div');
                        messagediv1.className = 'message321';
                        messagediv1.textContent ="@" + "" + reply.replyTo.userName + " " + reply.comment;
                        const currentImage1 = document.createElement("IMG");
                        currentImage1.className = 'userimage';
                        currentImage1.src = reply.user.thumbnail;
                        const date2 = document.createElement('div');
                        date2.className = 'date';
                        var date3 = new Date(reply.date);
                        var options = { month: 'long'};
                        var month = new Intl.DateTimeFormat('en-US', options).format(date3);
                        var day = date3.getDate();
                        var year = date3.getFullYear();
                        date2.textContent = month + " " + day + ", " + year;
                        const linebreak1 = document.createElement("br");
                        const replyButton1 = document.createElement("button");
                        replyButton1.className = "replybutton"
                        replyButton1.id = "replybutton" +reply._id;
                        replyButton1.value = reply._id
                        replyButton1.textContent = "Reply";
                        //replyButton.onclick = addReply;
                        //replyButton.onclick = logvalue;
                        replyDiv.appendChild(currentImage1);
                        replyDiv.appendChild(userDiv1);
                        replyDiv.appendChild(messagediv1);
                        replyDiv.appendChild(replyButton1);
                        replyDiv.appendChild(date2);
                        replyDiv.appendChild(linebreak1);
                        var originalDiv = document.getElementById(reply.replyTo._id);
                        insertAfter(replyDiv, originalDiv);
                        
                        replyButton1.onclick = function () {
                            var commentid = this.value;
                            var originalDiv = document.getElementById(commentid);
                            console.log(originalDiv);
                            var textBox = document.createElement('input');
                            var submitButton = document.createElement('button');
                            submitButton.textContent = "Submit";
                            var newDiv = document.createElement('div');
                            newDiv.appendChild(textBox);
                            newDiv.appendChild(submitButton);
                            console.log(newDiv);
                            insertAfter(newDiv,originalDiv);
                            submitButton.addEventListener('click', function() {
                            var text = document.createElement('div');
                            text.id = "inputText";
                            var userName = document.getElementsByClassName('message123')
                            text.textContent = "@" + userName[0].textContent + " "+  textBox.value;
                            var userName = document.createElement('div');
                            userName.textContent = JSON.parse(currentUser).userName;
                            var finalDiv = document.createElement('div');
                            finalDiv.appendChild(userName);
                            finalDiv.appendChild(text);
                            insertAfter(finalDiv, originalDiv)
                            var comment = textBox.value;
                            newDiv.remove();
                            var url = document.getElementById('url').value;
                            var userName = originalDiv.getElementsByClassName('message123');
                            var reply = {
                                "comment": comment,
                                "url": url,
                                "user": JSON.parse(currentUser),
                                "isReply" : true,
                                "replyTo" : {
                                    "userName" : userName[0].textContent,
                                    "_id" : commentid
                                },
                                "_id" : mongoObjectId()
                            }
                            var replyRequest = new XMLHttpRequest();
                            replyRequest.open('POST', 'http://localhost:5000/add');
                            replyRequest.setRequestHeader('Content-Type', 'application/json');
                            replyRequest.send(JSON.stringify(reply));
                            var addReplyToParent = new XMLHttpRequest();
                            addReplyToParent.open('PATCH', 'http://localhost:5000/add/reply/' + commentid + '/' + reply._id);
                            addReplyToParent.send();
                            
        
                            });
                        }
                        }
                        
                    }
                
              

                
                //document.getElementById('replybutton').addEventListener("click", logvalue)
            }
        }
    }
    request2.send();
}


//display user comments at URL
const displayUserComments = () => {

    //get current User ID
    var loginRequest3 = new XMLHttpRequest(); 
    loginRequest3.open('GET', 'http:localhost:5000/profile');
    loginRequest3.onload = function () {
        currentUser = loginRequest3.responseText;
    }
    loginRequest3.send();

    var request3 = new XMLHttpRequest();
    request3.open('GET', 'http://localhost:5000/get/all');
    request3.onload = function () {
        //all the comments
        const data = JSON.parse(request3.response);
        for (var i = 0; i < data.length; i++) {
            if (data[i].user._id == JSON.parse(currentUser)._id && data[i].url == document.getElementById('url').value) {
                var userDiv = document.getElementById('userComments');
                var userContent = document.createTextNode(data[i].comment);
                userDiv.appendChild(userContent);
                linebreak = document.createElement("br");
                userDiv.appendChild(linebreak);
            }
        }
    }
    request3.send();
}

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};


function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
