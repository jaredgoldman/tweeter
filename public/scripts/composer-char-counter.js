$(document).ready(function() {

  $('#tweet-text').on('keyup', function(event) {
      $('.counter').text(140 - this.value.length);
      if (140 - this.value.length < 0) {
        $('.counter').css('color', 'red');
        // figure out how to alter class instead of setting style
      }
  })

  $('.tweetcontainer').on('mouseover', function() {
    $('.handle').css('display', 'block');
  })

});