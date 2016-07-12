var historyData;
var serverUrl = 'http://127.0.0.1:3000';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {

    chrome.history.search({text: '', maxResults: 5}, function(data) {
      historyData = data.map(function(page) {
        page.url = page.url.split('://')[1];
        return page;
      });
      historyData.forEach(function(page) {
        if (true || page.url.includes('stackoverflow')) { //TODO: create a blacklist of URLs
          sendUrl(page.url);
        }
      });
    });
  }  
});


var sendUrl = function(url) {
  var x = new XMLHttpRequest();
  x.open('POST', serverUrl);
  var urlEncodedData = encodeURIComponent('url') + '=' + encodeURIComponent(url);
  x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  x.send(urlEncodedData);

};


