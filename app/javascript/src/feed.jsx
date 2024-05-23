import React from 'react';
import { GetAllTweets, PostTweet, DeleteTweet } from './requests';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetList: [],
      message: '',
    };
  }

  componentDidMount() {
    GetAllTweets((tweetList) => {
      this.setState({ tweetList: tweetList });
    });
  }

  highlightSearchTerm = (message, term) => {
    const splitString = message.split(new RegExp(`(${term})`, 'gi'));
    return splitString.map((word, index) => {
      return word.toLowerCase() === term.toLowerCase() ? <mark key={index} className='bg-warning'>{word}</mark> : word;
    });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
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
    PostTweet(this.state.message, () => {
      GetAllTweets((tweetList) => {
        this.setState({ tweetList: tweetList });
      });
      this.setState({ message: '' });
    });
  };

  render() {
    const { currentUser, searchResults, showSearchResults, searchTerm, windowWidth } = this.props;
    const tweets = showSearchResults ? searchResults : this.state.tweetList;
    return (
      <div className='col-12 col-md-8 col-xl-9 px-0 mb-0 pb-0 vh-100 bg-secondary'>
        <form
          className='twitter-composer d-flex flex-column align-items-center mx-0 pb-5 bg-light'
          onSubmit={this.handleSubmit}
        >
          <h1 className='text-center my-4 my-md-5'>Twitter</h1>
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
          <div className='col-7 col-md-6 d-flex justify-content-around mt-3'>
            <button className='btn btn-primary'>Upload Image</button>
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
              return tweets.map((tweet) => (
                <div className='tweet card mb-5 border-0' key={tweet.id}>
                  <div className='card-body d-flex flex-column bg-secondary text-light'>
                    <div className='d-flex flex-row justify-content-between'>
                      <Link to={`/home/${tweet.username}`} className='h5 btn fw-light text-info p-0 align-self-end'>
                        @{tweet.username}
                      </Link>
                      <button
                        className={
                          'btn btn-outline-light btn-sm' +
                          (currentUser !== tweet.username ? ' d-none' : '')
                        }
                        onClick={() => this.handleDeleteTweet(tweet.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    <hr />
                    <h5 className=''>
                      {showSearchResults && searchTerm !== ''
                        ? this.highlightSearchTerm(tweet.message, searchTerm)
                        : tweet.message}
                    </h5>
                    {/* <img src='https://picsum.photos/400' alt='placeholder' /> */}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
