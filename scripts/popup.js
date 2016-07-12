myApp.controller('PageController', function($scope, $http) {
  $scope.message = 'Recent History:';
  // TODO: refactor some logic out into a factory/service if i get repetitive
  var bg = chrome.extension.getBackgroundPage();
  $scope.historyItems = bg.historyData;
  $scope.displayedItems = $scope.historyItems;

  var serverUrl = bg.serverUrl;

  $scope.runSearch = function() {
    var query = $scope.searchQuery;
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
          return resp.data.indexOf(historyItem.url) !== -1;
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