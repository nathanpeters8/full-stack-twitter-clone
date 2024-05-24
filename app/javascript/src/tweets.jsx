import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DeleteTweet, GetAllTweets, GetUserTweets } from './requests';
import './tweets.scss';

// Tweets component
const Tweets = ({ tweets, currentUser, showSearchResults, searchTerm, isFeedDisplayed, setTweets, profileUser }) => {
  // Highlight search term in tweet messages when searching
  const highlightSearchTerm = (message, term) => {
    // Split message into words based on search term
    const splitString = message.split(new RegExp(`(${term})`, 'gi'));

    // Map over split message and highlight search term
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

  // Handle delete tweet button click
  const handleDeleteTweet = (id, username) => {
    DeleteTweet(id, () => {
      if (username) {
        // If on profile page, get user tweets after deleting tweet
        GetUserTweets(username, (tweetList) => {
          setTweets(tweetList);
        });
      } else {
        // If on feed page, get all tweets after deleting tweet
        GetAllTweets((tweetList) => {
          setTweets(tweetList);
        });
      }
    });
  };

  //reverse tweets if on profile page
  const currentTweets = isFeedDisplayed ? tweets : tweets.reverse();

  return (
    <div className='content col-12 d-flex flex-column align-items-center mt-5'>
      {/* Back button */}
      <button
        className={'btn btn-warning align-self-start ' + (showSearchResults ? '' : 'd-none')}
        onClick={() => {
          window.location.href = isFeedDisplayed ? '/home' : '/home/' + currentUser;
        }}
      >
        Back
      </button>
      {/* Profile heading */}
      <h4 className={'text-light fw-bold mb-5 border-bottom border-2 pb-2 ' + (isFeedDisplayed ? 'd-none' : '')}>
        {profileUser + "'s Profile"}
      </h4>
      {/* Tweet cards */}
      <div className={'card-deck h-50 mt-3 w-75 '}>
        {(() => {
          // Display message if no tweets are found
          if (currentTweets.length === 0) {
            return <h1 className='text-center'>No Tweets</h1>;
          }
          // Display message if search term is empty
          if (searchTerm === '' && showSearchResults) {
            return <h1 className='text-center'>Search for something</h1>;
          }
          // Map over tweets and display tweet cards
          return currentTweets.map((tweet) => (
            <div className='tweet card mb-5 border-0' key={tweet.id}>
              <div className='card-body d-flex flex-column bg-dark text-light rounded-2 border-2 border-dark'>
                <div className='d-flex flex-row justify-content-between'>
                  {/* Tweet username */}
                  <Link
                    to={`/home/${tweet.username}`}
                    className='tweet-username font-monospace text-info p-0 align-self-end fs-5'
                  >
                    @{tweet.username}
                  </Link>
                  {/* Delete tweet button */}
                  <button
                    className={'btn btn-outline-light btn-sm' + (currentUser !== tweet.username ? ' d-none' : '')}
                    onClick={() => handleDeleteTweet(tweet.id, isFeedDisplayed ? null : tweet.username)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <hr />
                {/* Tweet message */}
                <h5 className=''>
                  {showSearchResults && searchTerm !== ''
                    ? highlightSearchTerm(tweet.message, searchTerm)
                    : tweet.message}
                </h5>
                {/* Tweet image (if provided)*/}
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
