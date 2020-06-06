window.comments = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    window.comments[request.url] = request.comment;
})