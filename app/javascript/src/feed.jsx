import React, { useState, useEffect } from 'react';
import { GetAllTweets } from './requests';
import Tweets from './tweets';
import TweetComposer from './tweet_composer';
import './feed.scss';

const Feed = ({ currentUser, searchResults, showSearchResults, searchTerm, windowWidth }) => {
  const [tweetList, setTweetList] = useState([]);
  const currentTweets = showSearchResults ? searchResults : tweetList;

  useEffect(() => {
    GetAllTweets((tweets) => {
      setTweetList(tweets);
    });
  }, []);

  return (
    <>
      <TweetComposer 
        setTweetList={setTweetList} 
        isFeedDisplayed={true} 
        currentUser={currentUser} 
      />
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
