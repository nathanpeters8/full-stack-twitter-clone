import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteTweet, GetAllTweets, GetUserTweets } from './requests';

const Tweets = ({ tweets, currentUser, showSearchResults, searchTerm, isFeedDisplayed, setTweets, windowWidth }) => {

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

  const handleDeleteTweet = (id, username) => {
    DeleteTweet(id, () => {
      if (username) {
        GetUserTweets(username, (tweetList) => {
          setTweets(tweetList);
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

  return (
    <div className='content col-12 d-flex flex-column align-items-center mt-5'>
      <button
        className={'btn btn-warning align-self-start ' + (showSearchResults ? '' : 'd-none')}
        onClick={() => {
          window.location.href = isFeedDisplayed ? '/home' : '/home/' + currentUser;
        }}
      >
        Back
      </button>
      <div className={'card-deck h-50 mt-3 ' + (windowWidth < 992 ? 'w-75' : 'w-50')}>
        {(() => {
          if (currentTweets.length === 0) {
            return <h1 className='text-center'>No Tweets</h1>;
          }
          if (searchTerm === '' && showSearchResults) {
            return <h1 className='text-center'>Search for something</h1>;
          }
          return currentTweets.map((tweet) => (
            <div className='tweet card mb-5 border-0' key={tweet.id}>
              <div className='card-body d-flex flex-column bg-dark text-light'>
                <div className='d-flex flex-row justify-content-between'>
                  <Link to={`/home/${tweet.username}`} className='btn font-monospace text-info p-0 align-self-end fs-5'>
                    @{tweet.username}
                  </Link>
                  <button
                    className={'btn btn-outline-light btn-sm' + (currentUser !== tweet.username ? ' d-none' : '')}
                    onClick={() => handleDeleteTweet(tweet.id, isFeedDisplayed ? null : tweet.username)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <hr />
                <h5 className=''>
                  {showSearchResults && searchTerm !== ''
                    ? highlightSearchTerm(tweet.message, searchTerm)
                    : tweet.message}
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
        })()}
      </div>
    </div>
  );
};

export default Tweets;
