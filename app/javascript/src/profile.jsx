import React from 'react';
import { useState, useEffect } from 'react';
import { GetUserTweets } from './requests';
import Tweets from './tweets';


const Profile = (props) => {
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const { showSearchResults, searchTerm, searchResults, windowWidth } = props;
  const username = window.location.pathname.replace('/home/', '');

  useEffect(() => {
    GetUserTweets(username, (tweets) => {
      setTweets(tweets);
    });
  }, []);

  useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  const currentTweets = showSearchResults ? searchResults : tweets;

  return (
    <>
      <div className='heading bg-light'>
        <h1 className='text-center py-5 display-3 text-decoration-underline fw-semibold'>Twitter Clone</h1>
        <h3 className='text-center my-5 fw-light'>@{username}'s Profile</h3>
        <hr />
      </div>
      <div className='content col-12 d-flex flex-column align-items-center mt-5'>
        <button
          className={'btn btn-warning align-self-start ' + (showSearchResults ? '' : 'd-none')}
          onClick={() => {
            window.location.href = '/home/' + username;
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
            return (
              <Tweets
                tweets={currentTweets}
                currentUser={currentUser}
                showSearchResults={showSearchResults}
                searchTerm={searchTerm}
                isFeedDisplayed={false}
              />
            );
          })()}
        </div>
      </div>
    </>
  );
};

export default Profile;
