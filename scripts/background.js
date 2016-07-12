var historyData;
var serverUrl = 'http://127.0.0.1:3000';

var getHistory = function() {
  chrome.history.search({text: '', maxResults: 10}, function(data) {
    historyData = data.map(function(page) {
      page.url = page.url.split('://')[1];
      return page;
    })
    .filter(function(page) {
      return !page.url.includes('google.com');
    });
    historyData.forEach(function(page) {
      if (!page.url.includes('google.com')) { //TODO: create a blacklist of URLs
        sendUrl(page.url);
      }
    });
  });
};

var sendUrl = function(url) {
  var x = new XMLHttpRequest();
  x.open('POST', serverUrl);
  var urlEncodedData = encodeURIComponent('url') + '=' + encodeURIComponent(url);
  x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  x.send(urlEncodedData);

};

getHistory();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    getHistory();
  }  
});