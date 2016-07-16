var historyData;
var serverUrl = 'http://localhost:8080/api/pages';

var getHistory = function() {
  chrome.history.search({text: '', maxResults: 50}, function(data) {
    // array of objects 
    console.log('chrome history data:', data);
    historyData = data.filter(function(page) {
      return !page.url.includes('google.com'); // TODO: create a blacklist of URLs
    });
    historyData.forEach(function(page) {
      sendPage(page);
    });
  });
};

var sendPage = function(page) {
  var x = new XMLHttpRequest();
  x.open('POST', serverUrl);
  var urlEncodedData = '';
  // TODO: send more fields from chrome history data to remote server
  urlEncodedData += encodeURIComponent('url') + '=' + encodeURIComponent(page.url);
  urlEncodedData += '&' + encodeURIComponent('title') + '=' + encodeURIComponent(page.title);
  x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  x.send(urlEncodedData);

};

getHistory();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    getHistory();
  }  
});