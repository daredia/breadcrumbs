var renderStatus = function(statusText) {
  $('#status').text(statusText);
};

$(function() {
  renderStatus('My Crumbs:');

  var history = chrome.extension.getBackgroundPage().historyData;
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

});


