import React from 'react';
import { GetAllTweets, PostTweet, DeleteTweet } from './requests';
import { Dropdown } from 'react-bootstrap';
import Tweets from './tweets';
import './feed.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetList: [],
      message: '',
      image: null,
    };
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    GetAllTweets((tweetList) => {
      this.setState({ tweetList: tweetList });
    });
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleRemoveImage = () => {
    this.setState({ image: null });
    this.fileInput.current.value = '';
  };

  handleDeleteTweet = (id) => {
    console.log(id);
    DeleteTweet(id, () => {
      GetAllTweets((tweetList) => {
        this.setState({ tweetList: tweetList });
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const img = this.state.image ? this.state.image : null;
    PostTweet(this.state.message, img, () => {
      GetAllTweets((tweetList) => {
        this.setState({ tweetList: tweetList });
      });
      this.setState({ message: '' });
      if (img) {
        this.handleRemoveImage();
      }
    });
  };

  render() {
    const { currentUser, searchResults, showSearchResults, searchTerm, windowWidth } = this.props;
    const tweets = showSearchResults ? searchResults : this.state.tweetList;
    return (
      <>
        <form
          className='twitter-composer d-flex flex-column align-items-center mx-0 pb-5 bg-light'
          onSubmit={this.handleSubmit}
        >
          <h1 className='text-center py-5 display-3 text-decoration-underline fw-semibold'>Twitter Clone</h1>
          <div className='col-8'>
            <input
              className='form-control form-control-lg'
              type='text'
              name=''
              id=''
              placeholder="What's Happening?"
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
          </div>
          <div className='col-4'>
            {(() => {
              if (this.state.image === null) {
                return null;
              }
              const objectURL = URL.createObjectURL(this.state.image);
              return (
                <div className='d-flex flex-column justify-content-center border py-2 px-4 my-3'>
                  <button onClick={this.handleRemoveImage} className='btn btn-danger btn-sm align-self-end mb-0'>
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
            <Dropdown>
              <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                Upload Image
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <input
                  type='file'
                  name='image'
                  accept='image/*'
                  onChange={this.handleImageChange}
                  ref={this.fileInput}
                />
              </Dropdown.Menu>
            </Dropdown>
            <button className='btn btn-primary' type='submit'>
              Tweet
            </button>
          </div>
        </form>
        <div className='content col-12 d-flex flex-column align-items-center mt-5'>
          <button
            className={'btn btn-warning align-self-start ' + (showSearchResults ? '' : 'd-none')}
            onClick={() => {
              window.location.href = '/home';
            }}
          >
            Back
          </button>
          <div className={'card-deck h-50 mt-3 ' + (windowWidth < 992 ? 'w-75' : 'w-50')}>
            {(() => {
              if (tweets.length === 0) {
                return <h1 className='text-center'>No Search Results</h1>;
              }
              if (searchTerm === '' && showSearchResults) {
                return <h1 className='text-center'>Search for something</h1>;
              }
              return (
                <Tweets
                  tweets={tweets}
                  currentUser={currentUser}
                  showSearchResults={showSearchResults}
                  searchTerm={searchTerm}
                  isFeedDisplayed={true}
                />
              );
            })()}
          </div>
        </div>
      </>
    );
  }
}

export default Feed;
