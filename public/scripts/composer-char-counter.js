$(document).ready(function() {

  // CHARACTER COUNTER ??

  // if char count goes over 140, turn counter text read
  $('#tweet-text').on('input', function() {
    $('#counter').text(140 - this.value.length);
    if (140 - this.value.length < 0) {
      $('#counter').addClass('negativechars');
    }
    if (140 - this.value.length > 0) {
      $('#counter').removeClass('negativechars');
    }
  });
  
});