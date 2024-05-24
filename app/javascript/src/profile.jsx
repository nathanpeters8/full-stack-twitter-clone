import React from 'react';
import { useState, useEffect } from 'react';
import { GetUserTweets } from './requests';
import Tweets from './tweets';
import TweetComposer from './tweet_composer';

const Profile = ({ showSearchResults, searchTerm, searchResults, windowWidth, currentUser }) => {
  const [tweetList, setTweetList] = useState([]);
  const username = window.location.pathname.replace('/home/', '');
  const currentTweets = showSearchResults ? searchResults : tweetList;

  useEffect(() => {
    GetUserTweets(username, (tweets) => {
      setTweetList(tweets);
    });
  }, []);

  return (
    <>
      <TweetComposer setTweetList={setTweetList} isFeedDisplayed={false} currentUser={currentUser} profileUser={username} />
      <Tweets
        tweets={currentTweets}
        currentUser={currentUser}
        showSearchResults={showSearchResults}
        searchTerm={searchTerm}
        isFeedDisplayed={false}
        setTweets={setTweetList}
        windowWidth={windowWidth}
      />
    </>
  );
};

export default Profile;
