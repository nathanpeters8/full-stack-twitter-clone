import React from 'react';
import { useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { PostTweet, GetAllTweets, GetUserTweets } from './requests';

const TweetComposer = ({ setTweetList, isFeedDisplayed, currentUser, profileUser }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const fileInput = useRef();

  // Handle message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle image input change
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle image removal from input
  const handleRemoveImage = () => {
    setImage(null);
    fileInput.current.value = '';
  };

  // Handle post tweet form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Return if message is empty
    if (message === '') {
      alert('Please enter a message');
      return;
    }

    // Post tweet with message and image (if provided)
    const img = image ? image : null;
    PostTweet(message, img, () => {
      if (!isFeedDisplayed && currentUser === profileUser) {
        // Get user tweets if on profile page
        GetUserTweets(currentUser, (tweets) => {
          setTweetList(tweets);
        });
      } else {
        // Get all tweets if on feed page
        if (isFeedDisplayed) {
          GetAllTweets((tweets) => {
            setTweetList(tweets);
          });
        } else {
          // Redirect to home page if on other user's profile page
          window.location.href = '/home';
        }
      }

      // Reset form fields and image from input
      setMessage('');
      if (img) {
        handleRemoveImage();
      }
    });
  };

  return (
    <>
      {/* Tweet composer form */}
      <form
        className='twitter-composer d-flex flex-column align-items-center mx-0 pb-5 bg-light'
        onSubmit={handleSubmit}
      >
        <h1 className='text-center py-5 display-3 text-decoration-underline fw-semibold'>Twitter Clone</h1>
        <div className='col-8'>
          {/* Tweet message input field */}
          <input
            className='form-control form-control-lg'
            type='text'
            name=''
            id=''
            placeholder="What's Happening?"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div className='col-4'>
          {(() => {
            // Display image preview if image is provided
            if (image === null) {
              return null;
            }
            const objectURL = URL.createObjectURL(image);
            return (
              <div className='d-flex flex-column justify-content-center border py-2 px-4 my-3'>
                <button onClick={handleRemoveImage} className='btn btn-danger btn-sm align-self-end mb-0'>
                  X
                </button>
                <div
                  className='aspectRatioBox mt-3'
                  style={{ backgroundImage: `url(${objectURL})` }}
                  onLoad={() => URL.revokeObjectURL(objectURL)}
                ></div>
              </div>
            );
          })()}
        </div>

        <div className='col-7 col-md-6 d-flex justify-content-around mt-3'>
          {/* Upload image dropdown button */}
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
              Upload Image
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <input type='file' name='image' accept='image/*' onChange={handleImageChange} ref={fileInput} />
            </Dropdown.Menu>
          </Dropdown>
          {/* Tweet submit button */}
          <button className='btn btn-primary' type='submit'>
            Tweet
          </button>
        </div>
      </form>
    </>
  );
};

export default TweetComposer;
