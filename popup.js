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
        .attr('href', history[i].url)
        .attr('target', '_blank')
        .appendTo($li);
  });
  $('body').append($hList);

  $('form').on('submit', function(e) {
    console.log('inside submit handler');
    var query = $('#searchQuery').val();

    $.ajax({
      url: serverUrl + '/search?q=' + query,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log('data from GET request: ', data);
      },
      error: function(data) {
        console.error('GET request failed');
      }
    });

    e.preventDefault();
  });

});


