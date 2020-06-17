var userID  = "";
window.onload = function () {
    var loginRequest1 = new XMLHttpRequest();
    loginRequest1.open('GET', 'http://localhost:5000/profile');
    loginRequest1.onload = async function () {
        if (await loginRequest1.responseText == 'Not logged in') {
            chrome.tabs.create({ url: 'http://localhost:5000/auth/google' });
        }
    }
    loginRequest1.send();
    var loginRequest2 = new XMLHttpRequest();
    loginRequest2.open('GET', 'http:localhost:5000/profile');
    loginRequest2.onload = async function () {
        userID = await loginRequest2.responseText;
    }
    loginRequest2.send();
    displayCommentsAtURL();
    displayUserComments();
    document.getElementById('save').onclick = function () {
        var comment = document.getElementById('comment').value;
        var name = document.getElementById('name').value;
        var url = document.getElementById('url').value;
        var addComment = {
            "name": name,
            "comment": comment,
            "url": url,
            "userID": userID
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
        div.textContent = addComment.name + " : " + addComment.comment;
        document.body.appendChild(div);
    }

    document.getElementById('logout').onclick = function() {
        var logoutRequest = new XMLHttpRequest();
        logoutRequest.open('GET', 'http://localhost:5000/auth/logout');
        logoutRequest.send();
    }


}
const displayCommentsAtURL = () => {
    //displayAllComments
    console.log('hello');
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://localhost:5000/get/all');
    request2.onload = function () {
        const data = JSON.parse(request2.response);
        for (var i = 0; i < data.length; i++) {
            console.log(data);
            if (data[i].url == document.getElementById('url').value) {
                console.log(data[i].comment);
                const div = document.createElement('div');
                div.textContent = data[i].name + " : " + data[i].comment;
                document.body.appendChild(div);
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
        userID = loginRequest3.responseText;
        console.log(userID);
    }
    loginRequest3.send();
    var request3 = new XMLHttpRequest();
    request3.open('GET', 'http://localhost:5000/get/all');
    request3.onload = function () {
        const data = JSON.parse(request3.response);
        for (var i = 0; i < data.length; i++) {
            console.log(data);
            console.log(data[i].userID);
            console.log(userID);
            if (data[i].userID == userID && data[i].url == document.getElementById('url').value) {
                console.log(data[i]);
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