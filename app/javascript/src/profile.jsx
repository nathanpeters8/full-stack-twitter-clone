import React from 'react';
import { useState, useEffect } from 'react';
import { GetUserTweets } from './requests';
import Tweets from './tweets';
import TweetComposer from './tweet_composer';

// Profile component
const Profile = ({ showSearchResults, searchTerm, searchResults, windowWidth, currentUser }) => {
  const [tweetList, setTweetList] = useState([]);
  // Get username from URL path
  const username = window.location.pathname.replace('/home/', '');
  // Display search results if search term is provided
  const currentTweets = showSearchResults ? searchResults : tweetList;

  // Get user tweets on page load
  useEffect(() => {
    GetUserTweets(username, (tweets) => {
      setTweetList(tweets);
    });
  }, []);

  return (
    <>
      {/* Tweet Composer component */}
      <TweetComposer
        setTweetList={setTweetList}
        isFeedDisplayed={false}
        currentUser={currentUser}
        profileUser={username}
      />
      {/* Tweets component */}
      <Tweets
        tweets={currentTweets}
        currentUser={currentUser}
        showSearchResults={showSearchResults}
        searchTerm={searchTerm}
        isFeedDisplayed={false}
        setTweets={setTweetList}
        windowWidth={windowWidth}
        profileUser={username}
      />
    </>
  );
};

export default Profile;
