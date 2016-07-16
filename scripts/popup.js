myApp.controller('PageController', function($scope, $http) {
  $scope.message = 'Recent History:';
  // TODO: refactor some logic out into a factory/service if i get repetitive
  var bg = chrome.extension.getBackgroundPage();
  $scope.historyItems = bg.historyData;

  var serverUrl = bg.serverUrl;

  $scope.fetchAll = function() {
    $http({
      method: 'GET',
      url: serverUrl
    })
    .then(function (resp) {
      $scope.historyItems = resp.data;
      $scope.displayedItems = $scope.historyItems;
    })
    .catch(function(err) {
      console.error('GET request failed in fetchAll', err);
    });
  };

  $scope.fetchAll();

  // TODO: get rid of this function or consider making it do something else
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
          var found = historyItem.title.toLowerCase().includes(query);
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