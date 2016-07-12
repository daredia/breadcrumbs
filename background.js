var historyData;
var postRoute = 'http://127.0.0.1:3000';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {

    chrome.history.search({text: '', maxResults: 1}, function(data) {
      historyData = data;
      data.forEach(function(page) {
        console.log(page.url);
        // issue a POST request to 127.0.0.1:3000 with 'url=www.curltest.com'
        sendUrl(page.url);
      });
    });
  }  
});


var sendUrl = function(url) {
  var x = new XMLHttpRequest();
  x.open('POST', postRoute);
  var urlEncodedData = encodeURIComponent('url') + '=' + encodeURIComponent(url);
  x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  x.setRequestHeader('Content-Length', urlEncodedData.length);
  x.send(urlEncodedData);

};


