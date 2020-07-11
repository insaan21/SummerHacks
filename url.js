//get url of current page
document.addEventListener("DOMContentLoaded", function() {
    chrome.tabs.query({
        active:  !0,
        lastFocusedWindow: !0
    }, function(t) {
        let currURL = t[0].url;
        document.getElementById('url').value = currURL;
    })
});
