var renderStatus = function(statusText) {
  // document.getElementById('status').textContent = statusText;
  $('#status').text(statusText);
};

$(function() {
  renderStatus('jquery is working!');  
});