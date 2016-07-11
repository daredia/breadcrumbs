var renderStatus = function(statusText) {
  document.getElementById('status').textContent = statusText;
};

document.addEventListener('DOMContentLoaded', function(event) { 
  renderStatus('it\'s working!');  
});


