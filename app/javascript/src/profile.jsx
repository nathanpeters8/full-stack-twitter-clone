import React from 'react';
import { useState, useEffect } from 'react';
import { GetUserTweets, DeleteTweet, Authenticate } from './requests';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Profile = (props) => {
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const username = window.location.pathname.replace('/home/', '');
  
  useEffect(() => {
    GetUserTweets(username, (tweets) => {
      setTweets(tweets);
    });
  }, []);

  useEffect(() => {
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  const handleDeleteTweet = (id) => {
    console.log(id);
    DeleteTweet(id, () => {
      GetUserTweets(username, (tweets) => {
        setTweets(tweets);
      });
    });
  };

  return (
    <div className='col-12 col-md-8 col-xl-9 px-0 mb-0 pb-0 vh-100 h-100 bg-secondary'>
      <div className='heading bg-light'>
        <h1 className='text-center'>Twitter</h1>
        <Link to='/home' className='btn btn-warning align-self-start'>
          Back
        </Link>
        <h3 className='text-center'>@{username}</h3>
        <hr />
      </div>
      <div className='content col-12 d-flex flex-column align-items-center mt-5'>
        <div className={'card-deck h-50 mt-3 ' + (props.windowWidth < 992 ? 'w-75' : 'w-50')}>
          {(() => {
            if (tweets.length === 0) {
              return <h1 className='text-center'>No Search Results</h1>;
            }
            return tweets.map((tweet) => (
              <div className='tweet card mb-5 border-0' key={tweet.id}>
                <div className='card-body d-flex flex-column bg-secondary text-light'>
                  <div className='d-flex flex-row justify-content-between'>
                    <Link to={`/home/${tweet.username}`} className='h5 btn fw-light text-info p-0 align-self-end'>
                      @{tweet.username}
                    </Link>
                    <button
                      className={'btn btn-outline-light btn-sm' + (currentUser !== tweet.username ? ' d-none' : '')}
                      onClick={() => this.handleDeleteTweet(tweet.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <hr />
                  <h5 className=''>{tweet.message}</h5>
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
    </div>
  );
};

export default Profile;
