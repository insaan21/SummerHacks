window.onload = function() {
    document.getElementById('save').onclick = function(){
        var value = "";
        chrome.storage.sync.get('myLine', function(data){
           value = data.myLine; 
        })
        value += document.getElementById('saveLine').value
        chrome.storage.sync.set({'myLine': value})
        const bg = chrome.extension.getBackgroundPage()
        const div = document.createElement('div')
        div.textContent = bg.comments[window.location.href]
        document.body.appendChild(div)
    }
}