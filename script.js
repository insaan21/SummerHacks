//file that runs every time chrome extension is loaded

var currentUser = "";
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
            "user": JSON.parse(currentUser)
        }
        var request1 = new XMLHttpRequest();

        //add comment to database
        request1.open("POST", "http://localhost:5000/add");
        request1.setRequestHeader('Content-Type', 'application/json');
        request1.send(JSON.stringify(addComment));

        //displayNewComment
        var userDiv = document.getElementById('userComments');
        var userContent = document.createTextNode(addComment.comment);
        userDiv.appendChild(userContent);
        linebreak = document.createElement("br");
        userDiv.appendChild(linebreak);
        const div = document.createElement('div');
        div.id = 'message123';
        const currentImage = document.createElement("IMG");
        currentImage.id="userimage"  
        currentImage.src = addComment.user.thumbnail;     
        div.textContent = addComment.user.userName + ":" 
        const messagediv = document.createElement('div');
        messagediv.id = 'message321';
        messagediv.textContent = addComment.comment;
        document.body.appendChild(currentImage);
        document.body.appendChild(div);
        document.body.appendChild(messagediv);
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
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://localhost:5000/get/all');
    request2.onload = function () {
        const data = JSON.parse(request2.response);
        for (var i = 0; i < data.length; i++) {
            if (data[i].url == document.getElementById('url').value) {
                const div = document.createElement('div');
                div.id = 'message123'
                div.textContent = data[i].user.userName + ":";
                const messagediv = document.createElement('div');
                messagediv.id = 'message321';
                messagediv.textContent = data[i].comment;
                const currentImage = document.createElement("IMG");
                currentImage.id='userimage'
                currentImage.src = data[i].user.thumbnail;
                var date1 = new Date(data[i].date);
                console.log(date1.getDate());
                const date = document.createElement('div');
                date.id='date';
                date.textContent = data[i].date;
                const linebreak = document.createElement("br");
                document.body.appendChild(currentImage);
                document.body.appendChild(div);
                document.body.appendChild(messagediv);
                document.body.appendChild(date);
                document.body.appendChild(linebreak);
                var date1 = new Date(data[i].date);
                console.log(date1.getDate());
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