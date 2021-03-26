$(document).ready(function() {
  
  // AJAX REQUESTS ??

  const sendTweet = (tweetBody) => {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetBody
    })
      .then(() => {
        loadTweets();
        document.getElementById('newtweet').reset();
      })
      .catch(err => console.log(err));
  };

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .then(res => renderTweets(res))
      .catch(err => console.log(err));
  };

  // TWEET GENERATION //

  const renderTweets = (tweetData) => {
    $('#tweets-container').empty();
    const newTweetsFirstArray = tweetData.reverse();
    for (const tweet of newTweetsFirstArray) {
      let newTweet = createTweetElement(tweet);
      $('#tweets-container').append(newTweet);
    }
  };

  const createTweetElement = (tweetObject) => {
    const name = tweetObject.user.name;
    const avatar = tweetObject.user.avatars;
    const handle = tweetObject.user.handle;
    const tweet = tweetObject.content.text;
    const dateCreated = createTimeFromStr(tweetObject.created_at);
    
    const $tweetHeader = $(
      `<div class="tweet-top">
      <div class="avatar">
      <img src="${avatar}" class="avatar-image">
      <p>${name}</p>
      </div>
      <p class="handle">${handle}</p>
      </div>`
    );
      
    const $tweetBody = $('<div class="tweetbody">').text(tweet);
      
    const $tweetFooter = $(
      `<div class="tweet-bottom">
        <div>${dateCreated}</div>
        <div class="socials">
        <img src="/images/heart-solid.svg">
        <img src="/images/retweet-solid.svg">
        <img src="/images/flag-solid.svg">
        </div>
        </div>`
    );
        
    const $tweet = $('<article class="tweet">');
        
    $tweet.append($tweetHeader);
    $tweet.append($tweetBody);
    $tweet.append($tweetFooter);
        
    return $tweet;
        
  };
      
  const isTweetInvalid = (tweet) => {
    return (tweet.length > 140 || tweet.length <= 0);
  };
      
  // show error messages
  const loadErrors = (tweet) => {
    if (tweet.length < 140) {
      $('#error').text('You cannot send a blank tweet');
      $('#error').slideDown();
    } else {
      $('#error').text('Your tweet exceeds the character limit');
      $('#error').slideDown();
    }
  };
      
  // EVENT HANDLERS //
      
  // slide animation for new tweet form
  $('.tweet-button-container',).on('click', function() {
    if ($('#new-tweet').css('display') === 'block') {
      $('#new-tweet').slideUp();
    } else {
      $('#new-tweet').slideDown();
    }
  });
      
  // makes form-top button appear and dissapear depending on where user has scrolled
  $(window).on('scroll', function() {
    let scroll = $(window).scrollTop();
    if (scroll >= 500) {
      $('#button-container').removeClass('button-container');
      $('#button-container').addClass('button-container-scroll');
    } else {
      $('#button-container').removeClass('button-container-scroll');
      $('#button-container').addClass('button-container');
    }
  });
      
  // submit event handler
  $('#newtweet').on('submit', function(event) {
    $('#error').slideUp();
    event.preventDefault();
    // loadTweets();
    const $tweet = $('#tweet-text').val();
    if (isTweetInvalid($tweet)) {
      loadErrors($tweet);
    } else {
      const $serialTweet = $(this).serialize();
      sendTweet($serialTweet);
      $('#counter').text(140);
    }
  });

  //
  $(".button-background").on("click", function() {
    window.scroll(0, 0);
  });
      
  $(".button-background").on("mouseover", function() {
    $(".formtop-img").attr('src', "/images/angle-double-down-white.png");
  });
  $(".button-background").on("mouseout", function() {
    $(".formtop-img").attr('src', "/images/angle-double-up-solid.png");
  });
    
  // HELPER FUNCTIONS ??

  const createTimeFromStr = (date) => {
    const currentDate = new Date;
    const tweetDate = new Date(date);
    const msDifference = (currentDate - tweetDate);
    const minutes = Math.round((msDifference / (1000 * 60)));
    const hours = Math.round((msDifference / (1000 * 60 * 60)));
    const days = Math.round(((msDifference / (1000 * 60 * 60 * 24)) % 7));
    const weeks = Math.round((msDifference / (1000 * 60 * 60 * 24 * 7)));
    if (weeks === 1) {
      return `Posted one week ago`;
    }
    if (weeks > 1) {
      return `Posted ${weeks} weeks ago`;
    } 
    if (days > 1) {
      return `posted ${days} days ago`;
    }
    if (hours > 1) {
      return `posted ${hours} hours ago`;
    }
    if (minutes > 1) {
      return `Posted ${minutes} minutes ago`;
    }
    return `Just posted`
  };

  loadTweets();

});

