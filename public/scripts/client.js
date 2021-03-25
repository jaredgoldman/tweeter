/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  
// create event handler for when the button is pushed
// create functions to handle event and disable default action
// feed information from tweet to renderTweets function 

  const sendTweet = (tweetBody) => {
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetBody
    })
    .then(console.log('tweet sent'))
    .catch(err => console.log(err))
  } 

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
    .then(res => renderTweets(res))
    .catch(err => console.log(err))
  }

// empties tweet-container first so we don't build up a massive pile of duplicate
// tweets when reloading 
  const renderTweets = (tweetData) => {
    $('#tweets-container').empty();
    // reverse order so newest tweets come first 
    // TODO - implement sort feature that sorts tweets by date 
    const newTweetsFirstArray = tweetData.reverse();
    for (const tweet of newTweetsFirstArray) {
      let newTweet = createTweetElement(tweet) 
      $('#tweets-container').append(newTweet); 
    }
  }


  const createTweetElement = (tweetObject) => {
    const name = tweetObject.user.name;
    const avatar = tweetObject.user.avatars;
    const handle = tweetObject.user.handle;
    const tweet = tweetObject.content.text;
    const dateCreated = tweetObject.created_at;
    // TODO - turn into human readable date string 
    
    const $tweetHeader = $(
     `<div class="tweet-top">
        <div class="avatar">
        <img src="${avatar}">
        <p>${name}</p>
      </div>
      <p class="handle">${handle}</p>
      </div>`
    )
    
    const $tweetBody = $('<div class="tweetbody">').text(tweet);

    const $tweetFooter = $(
      `<div class="tweet-bottom">
      <div>${dateCreated}</div>
      <div class="socials">socials</div>
      </div>`
    )
    // TODO - implement .text method on any part of the tweet that could suffer a text injection
    const $tweet = $('<article class="tweet">')
    
    $tweet.append($tweetHeader)
    $tweet.append($tweetBody)
    $tweet.append($tweetFooter)
      
    return $tweet;
    
    }
    
    const isTweetInvalid = (tweet) => {
      return (tweet.length > 140 || tweet.length <= 0) 
    }

    const loadErrors = (tweet) => {
      if (tweet.length < 140) {
        $('#error').text('you cannot send a blank tweet');
        $('#error').slideDown()
      } else {
        $('#error').text('your tweet exceeds the character limit')
        $('#error').slideDown()
      }
    }

    $('#compose-container', ).on('click', function () {
      if ($('#new-tweet').css('display') === 'block') {
        $('#new-tweet').slideUp();           
      } else {
        $('#new-tweet').slideDown();   
      }
    });
        
    $('#newtweet').on('submit', function(event) {
      $('#error').slideUp();
      event.preventDefault();
      loadTweets();
      const $tweet = $('#tweet-text').val();
      if (isTweetInvalid($tweet)) {
        loadErrors($tweet);
      } else {
        const $serialTweet = $(this).serialize();
        sendTweet($serialTweet);
      }
    }) 
    
    loadTweets();

});

// we could loadTweets every time we click submit 