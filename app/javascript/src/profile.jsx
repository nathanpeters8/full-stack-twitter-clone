import React from 'react';
import { useState, useEffect } from 'react';
import { GetUserTweets, DeleteTweet, Authenticate } from './requests';
import { Link } from 'react-router-dom';

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
    <div className='col-9'>
      <h1 className='text-center'>Twitter</h1>
      <div className='content col-12 d-flex flex-column align-items-center mt-5'>
        <Link to='/home' className="btn btn-warning align-self-start">Back</Link>
        <h3 className='text-center border-bottom'>@{username}</h3>
        <hr />
        <div className='card-deck h-50 w-50'>
          {tweets.map((tweet) => (
            <div className='tweet card border mb-5' key={tweet.id}>
              <div className='card-body d-flex flex-column'>
                <button className={'btn btn-sm border align-self-end' + (username !== currentUser ? ' d-none' : '')} onClick={() => handleDeleteTweet(tweet.id)}>
                  Delete
                </button>
                <button
                  className='h6 btn fw-light p-0 align-self-start'
                >
                  @{tweet.username}
                </button>
                <hr />
                <h5 className=''>{tweet.message}</h5>
                {/* <img src='https://picsum.photos/400' alt='placeholder' /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
