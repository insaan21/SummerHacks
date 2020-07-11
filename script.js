var currentUser = "";
window.onload = function () {
    //var temp = "";
    var loginRequest1 = new XMLHttpRequest();
    loginRequest1.open('GET', 'http://localhost:5000/profile');
    loginRequest1.onload = async function () {
        //console.log(loginRequest1.responseText);
        if (await loginRequest1.responseText == 'Not logged in') {
            chrome.tabs.create({ url: 'http://localhost:5000/auth/google' });
            //console.log('reached');
        }
    }
    loginRequest1.send();
    var loginRequest2 = new XMLHttpRequest();
    loginRequest2.open('GET', 'http:localhost:5000/profile');
    loginRequest2.onload = async function () {
        currentUser = await loginRequest2.responseText;
    }
    loginRequest2.send();
    displayCommentsAtURL();
    displayUserComments();
    document.getElementById('save').onclick = function () {
        var comment = document.getElementById('comment').value;
        var name = document.getElementById('name').value;
        var url = document.getElementById('url').value;
        //console.log(currentUser);
        var addComment = {
            "comment": comment,
            "url": url,
            "user": JSON.parse(currentUser)
        }
        var request1 = new XMLHttpRequest();
        request1.open("POST", "http://localhost:5000/add");
        request1.setRequestHeader('Content-Type', 'application/json');
        request1.send(JSON.stringify(addComment));
        var userDiv = document.getElementById('userComments');
        var userContent = document.createTextNode(addComment.comment);
        userDiv.appendChild(userContent);
        linebreak = document.createElement("br");
        userDiv.appendChild(linebreak);
        const div = document.createElement('div');
        div.id = 'message123';
        //console.log(addComment.user);
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

    document.getElementById('logout').onclick = function() {
        var logoutRequest = new XMLHttpRequest();
        logoutRequest.open('GET', 'http://localhost:5000/auth/logout');
        logoutRequest.send();
    }


}
const displayCommentsAtURL = () => {
    //displayAllComments
    //console.log('hello');
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://localhost:5000/get/all');
    request2.onload = function () {
        const data = JSON.parse(request2.response);
        for (var i = 0; i < data.length; i++) {
            //console.log(data);
            if (data[i].url == document.getElementById('url').value) {
                console.log(data[i].comment);
                const div = document.createElement('div');
                div.id = 'message123'
                div.textContent = data[i].user.userName + ":";
                const messagediv = document.createElement('div');
                messagediv.id = 'message321';
                messagediv.textContent = data[i].comment;
                const currentImage = document.createElement("IMG");
                currentImage.id='userimage'
                currentImage.src = data[i].user.thumbnail;
                const linebreak = document.createElement("br");
                document.body.appendChild(currentImage);
                document.body.appendChild(div);
                document.body.appendChild(messagediv);
                document.body.appendChild(linebreak);
            }
        }
    }
    request2.send();
}
const displayUserComments = () => {
    //displayAllComments
    var loginRequest3 = new XMLHttpRequest(); 
    loginRequest3.open('GET', 'http:localhost:5000/profile');
    loginRequest3.onload = function () {
        currentUser = loginRequest3.responseText;
        //console.log(currentUser);
    }
    loginRequest3.send();
    var request3 = new XMLHttpRequest();
    request3.open('GET', 'http://localhost:5000/get/all');
    request3.onload = function () {
        const data = JSON.parse(request3.response);
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            //console.log(data);
            //console.log(data[i].user);
            console.log(JSON.parse(currentUser)._id);
            console.log(data[i].user._id);
            if (data[i].user._id == JSON.parse(currentUser)._id && data[i].url == document.getElementById('url').value) {
                console.log(data[i].user.googleID);
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