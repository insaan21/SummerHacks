window.onload = function() {
    document.getElementById('acceptFriendRequest').onclick = function () {
        var addFriend = new XMLHttpRequest();
        addFriend.open('PATCH', 'http://localhost:5000/friends/acceptFriendRequest/' + this.value);
        addFriend.send();
        window.location.href = "http://localhost:5000/profile/getProfile";
    }
    document.getElementById('denyFriendRequest').onclick = function () {
        var addFriend = new XMLHttpRequest();
        addFriend.open('PATCH', 'http://localhost:5000/friends/denyFriendRequest/' + this.value);
        addFriend.send();
        window.location.href = "http://localhost:5000/profile/getProfile";
    }
}