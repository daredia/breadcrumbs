var renderStatus = function(statusText) {
  $('#status').text(statusText);
};

$(function() {
  // renderStatus('My Crumbs:');

  var bg = chrome.extension.getBackgroundPage();
  var serverUrl = bg.serverUrl;
  var history = bg.historyData;
  var $hList = $('<ul>');
  $.each(history, function(i) {
    var $li = $('<li/>')
        .appendTo($hList);
    var $link = $('<a/>')
        .text(history[i].title)
        .attr('href', 'http://' + history[i].url)
        .attr('target', '_blank')
        .appendTo($li);
  });
  $('body').append($hList);

  $('form').on('submit', function(e) {
    var query = $('#searchQuery').val();

    $.ajax({
      url: serverUrl + '/search?q=' + query,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log('data from GET request: ', data);
        var mappedData = JSON.parse(data).map(function(link) {
          return 'http://' + link;
        });
        $('li').filter(function() {
          // return true if li's a's href is contained in mappedData (which has a leading http://)
          var linkHref = $(this).find('a').attr('href');
          return mappedData.indexOf(linkHref) === -1;
        }).hide('slow');
      },
      error: function(data) {
        console.error('GET request failed');
      }
    });

    e.preventDefault();
  });

});


