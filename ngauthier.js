$(function() {
  if (window.location.search.indexOf('nodeadzone') > -1) {
    var topStyle = $('<style></style>');
    topStyle.text(".slide .content { margin-top: 20px !important }");
    $('head').append(topStyle);
  }
});
