$(document).ready(function() {

  $('#tweet-text').on('input', function(event) {
      $('#counter').text(140 - this.value.length);
      if (140 - this.value.length < 0) {
        $('#counter').addClass('negativechars');
      }
      if (140 - this.value.length > 0) {
        $('#counter').removeClass('negativechars');
        // figure out how to alter class instead of setting style
      }
  })
});