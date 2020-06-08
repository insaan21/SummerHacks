window.onload = function() {
    document.getElementById('save').onclick = function(){
                var comment = document.getElementById('comment').value
                var name = document.getElementById('name').value
                var request1 = new XMLHttpRequest();
                var url = 'http://localhost:3000/add/' + comment + '/' + name 
                request1.open('GET', url)
                request1.send()
               fetch("./comments.json")
                    .then(function(resp){
                        return resp.json();
                    })
                    .then(function(data){
                        var comments = Object.keys(data)
                        console.log(comments);
                        for(var i = 0; i < comments.length; i++){
                            var currentName = data[comments[i]]
                            const div = document.createElement('div')
                            div.textContent = currentName + ": " + comments[i]
                            document.body.appendChild(div)
                        }
                    })
        }
       
    }
