// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' gray!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="gray"'
//   });
// });


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    chrome.history.search({text: '', maxResults: 10}, function(data) {
      data.forEach(function(page) {
        console.log(page.url);
      });
    });


    // console.log('Turning ' + tab.url + ' gray!');
    // chrome.tabs.executeScript({
    //   code: 'document.body.style.backgroundColor="gray"'
    // });  
  }
  
});


