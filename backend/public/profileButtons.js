window.onload = function() {
    document.getElementById('friendRequest').onclick = function() {
        if(this.innerHTML == 'Remove Friend'){
            var removeFriend = new XMLHttpRequest();
            removeFriend.open('PATCH', 'http://localhost:5000/friends/removeFriend/' + this.value);
            removeFriend.send();
        }
        else{
            var sendFriendRequest= new XMLHttpRequest();
            sendFriendRequest.open('PATCH', 'http://localhost:5000/friends/sendFriendRequest/' + this.value);
            sendFriendRequest.send();
        }
       
    }
}