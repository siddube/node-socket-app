$(document).ready(function() {
  $('#login-btn').on('click', function (e) {
    e.preventDefault();
    $('#login-form').submit();
  });
});