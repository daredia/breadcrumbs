myApp.controller('PageController', function($scope) {
  $scope.message = 'Recent History:';
  // TODO: refactor some logic out into a factory/service
  var bg = chrome.extension.getBackgroundPage();
  $scope.historyItems = bg.historyData;

  var serverUrl = bg.serverUrl;
  // TODO: add form submitHandler method to $scope and then remove jquery
});




// $(function() {
//   $('form').on('submit', function(e) {
//     var query = $('#searchQuery').val();

//     $.ajax({
//       url: serverUrl + '/search?q=' + query,
//       type: 'GET',
//       contentType: 'application/json',
//       success: function(data) {
//         console.log('data from GET request: ', data);
//         var mappedData = JSON.parse(data).map(function(link) {
//           return 'http://' + link;
//         });
//         $('li').filter(function() {
//           // return true if li's a's href is contained in mappedData (which has a leading http://)
//           var linkHref = $(this).find('a').attr('href');
//           return mappedData.indexOf(linkHref) === -1;
//         }).hide('slow');
//       },
//       error: function(data) {
//         console.error('GET request failed');
//       }
//     });

//     e.preventDefault();
//   });

// });


