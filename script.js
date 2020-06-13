window.onload = function() {
    document.getElementById('save').onclick = function(){
        var comment = document.getElementById('comment').value;
        var name = document.getElementById('name').value;
        var addComment  = {
            "name" : name,
            "comment" : comment
        }
        var request1 = new XMLHttpRequest();
        request1.open("POST", "http://localhost:3000/add");
        request1.setRequestHeader('Content-Type', 'application/json');
        request1.send(JSON.stringify(addComment));

        //displayAllComments
        var request2 = new XMLHttpRequest();
        request2.open('GET', 'http://localhost:3000/get/all');
        request2.onload = function(){
            const data = JSON.parse(request2.response);
            for(var i = 0; i < data.length; i++){
                const div = document.createElement('div');
                div.textContent = data[i].name + " : " + data[i].comment;
                document.body.appendChild(div);
            }
        }
        request2.send();
        }
       
    }
