var userComment = ""
chrome.storage.sync.get('myLine', function(data){
    userComment = data.myLine;
})
console.log(userComment);
        chrome.runtime.sendMessage({
            url: window.location.href,
            comment: userComment
        })