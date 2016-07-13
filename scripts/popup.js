myApp.controller('PageController', function($scope, $http) {
  $scope.message = 'Recent History:';
  // TODO: refactor some logic out into a factory/service if i get repetitive
  var bg = chrome.extension.getBackgroundPage();
  $scope.historyItems = bg.historyData.filter(function(historyItem) {
    return historyItem.title;
  });
  $scope.displayedItems = $scope.historyItems;

  var serverUrl = bg.serverUrl;

  $scope.fetchAll = function() {
    $http({
      method: 'GET',
      url: serverUrl + '/search?q='
    })
    .then(function (resp) {
      console.log('resp.data in fetchAll:', resp.data);
      // $scope.displayedItems = $scope.historyItems.filter(function(historyItem) {
      //   console.log('historyItem:', historyItem);
      //   var found = historyItem.title.toLowerCase().includes(query);
      //   console.log('query found in title:', found);
      //   found = found || resp.data.indexOf(historyItem.url) !== -1;
      //   return found;
      // });
      // if ($scope.displayedItems.length) {
      //   $scope.message = 'Crumbs containing "' + query + '":';
      // } else {
      //   $scope.message = 'No crumbs containing "' + query + '"';
      // }
    })
    .catch(function(err) {
      console.error('GET request failed in fetchAll', err);
    });
  };

  // $scope.fetchAll();

  $scope.runSearch = function() {
    var query = $scope.searchQuery ? $scope.searchQuery.toLowerCase() : '';
    if (!query) {
      $scope.displayedItems = $scope.historyItems;
      $scope.message = 'Recent History:';
    } else {
      $http({
        method: 'GET',
        url: serverUrl + '/search?q=' + query
      })
      .then(function (resp) {
        $scope.displayedItems = $scope.historyItems.filter(function(historyItem) {
          console.log('historyItem:', historyItem);
          var found = historyItem.title.toLowerCase().includes(query);
          console.log('query found in title:', found);
          found = found || resp.data.indexOf(historyItem.url) !== -1;
          return found;
        });
        if ($scope.displayedItems.length) {
          $scope.message = 'Crumbs containing "' + query + '":';
        } else {
          $scope.message = 'No crumbs containing "' + query + '"';
        }
      })
      .catch(function(err) {
        console.error('GET request failed', err);
      });
    }
  };

});