window.onload = function() {
    displayCommentsAtURL();
    document.getElementById('save').onclick = function(){
        var comment = document.getElementById('comment').value;
        var name = document.getElementById('name').value;
        var url = document.getElementById('url').value;
        var addComment  = {
            "name" : name,
            "comment" : comment,
            "url" : url
        }
        var request1 = new XMLHttpRequest();
        request1.open("POST", "http://localhost:5000/add");
        request1.setRequestHeader('Content-Type', 'application/json');
        request1.send(JSON.stringify(addComment));
        const div = document.createElement('div');
        div.textContent = addComment.name + " : " + addComment.comment;
        document.body.appendChild(div);
        }

       
    }
const displayCommentsAtURL = () => {
        //displayAllComments
        var request2 = new XMLHttpRequest();
        request2.open('GET', 'http://localhost:5000/get/all');
        request2.onload = function(){
            const data = JSON.parse(request2.response);
            for(var i = 0; i < data.length; i++){
                console.log(data);
                if(data[i].url == document.getElementById('url').value){
                const div = document.createElement('div');
                div.textContent = data[i].name + " : " + data[i].comment;
                document.body.appendChild(div);
                }
            }
        }
        request2.send();
}