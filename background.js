var historyData;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {

    chrome.history.search({text: '', maxResults: 5}, function(data) {
      historyData = data;
      // data.forEach(function(page) {
      //   console.log(page.url);
      // });
    });
  }  
});





