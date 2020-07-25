window.onload = function() {
    document.getElementById('register').onclick = function() {
        console.log('hello');
        //console.log(document.getElementById('userName').textContent);
        var user = {
            "userName" : document.getElementById('userName').value,
            "email" : document.getElementById('email').value,
            "password" : document.getElementById('password').value
        }
        console.log(user);
        var register = new XMLHttpRequest();
        register.open("POST", "http://localhost:5000/api/user/register");
        register.setRequestHeader('Content-Type', 'application/json');
        register.send(JSON.stringify(user));
        if(register.status == 400){
            alert(register.status);
        }
        else{
            chrome.tabs.create({ url: 'http://localhost:5000/api/user/loginPage' });
        }
        
    }
}
