import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Tweets = (props) => {
  const { tweets, currentUser, showSearchResults, searchTerm, isFeedDisplayed } = props;

  const highlightSearchTerm = (message, term) => {
    const splitString = message.split(new RegExp(`(${term})`, 'gi'));
    return splitString.map((word, index) => {
      return word.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className='bg-warning'>
          {word}
        </mark>
      ) : (
        word
      );
    });
  };

  const handleDeleteTweet = (id, username = null) => {
    DeleteTweet(id, () => {
      if (username) {
        GetUserTweets(username, (tweets) => {
          setTweets(tweets);
        });
      } else {
        GetAllTweets((tweetList) => {
          setTweets(tweetList);
        });
      }
    });
  };

  //reverse tweets if feed not displayed
  const currentTweets = isFeedDisplayed ? tweets : tweets.reverse();

  return currentTweets.map((tweet) => (
    <div className='tweet card mb-5 border-0' key={tweet.id}>
      <div className='card-body d-flex flex-column bg-secondary text-light'>
        <div className='d-flex flex-row justify-content-between'>
          <Link to={`/home/${tweet.username}`} className='h5 btn fw-light text-info p-0 align-self-end'>
            @{tweet.username}
          </Link>
          <button
            className={'btn btn-outline-light btn-sm' + (currentUser !== tweet.username ? ' d-none' : '')}
            onClick={() => handleDeleteTweet(tweet.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <hr />
        <h5 className=''>
          {showSearchResults && searchTerm !== '' ? highlightSearchTerm(tweet.message, searchTerm) : tweet.message}
        </h5>
        {tweet.image !== undefined && (
          <div
            className='tweetAspectRatioBox'
            style={{
              backgroundImage: `url(${tweet.image})`,
            }}
          ></div>
        )}
      </div>
    </div>
  ));
};

export default Tweets;