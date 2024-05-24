import React, { useState, useEffect } from 'react';
import { GetAllTweets } from './requests';
import Tweets from './tweets';
import TweetComposer from './tweet_composer';
import './feed.scss';

// Feed component
const Feed = ({ currentUser, searchResults, showSearchResults, searchTerm, windowWidth }) => {
  const [tweetList, setTweetList] = useState([]);
  // Display search results if search term is provided
  const currentTweets = showSearchResults ? searchResults : tweetList;

  // Get all tweets on page load
  useEffect(() => {
    GetAllTweets((tweets) => {
      setTweetList(tweets);
    });
  }, []);

  return (
    <>
      {/* Tweet Composer component */}
      <TweetComposer setTweetList={setTweetList} isFeedDisplayed={true} currentUser={currentUser} />
      {/* Tweets component */}
      <Tweets
        tweets={currentTweets}
        currentUser={currentUser}
        showSearchResults={showSearchResults}
        searchTerm={searchTerm}
        isFeedDisplayed={true}
        setTweets={setTweetList}
        windowWidth={windowWidth}
      />
    </>
  );
};

export default Feed;
