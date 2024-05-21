import React from 'react';
import { GetAllTweets, PostTweet, DeleteTweet } from './requests';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      message: '',
    };
  }

  componentDidMount() {
    GetAllTweets((tweets) => {
      this.setState({ tweets: tweets });
    });
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleDeleteTweet = (id) => {
    console.log(id);
    DeleteTweet(id, () => {
      GetAllTweets((tweets) => {
        this.setState({ tweets: tweets });
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    PostTweet(this.state.message, () => {
      GetAllTweets((tweets) => {
        this.setState({ tweets: tweets });
      });
      this.setState({ message: '' });
    });
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className='col-9'>
        <h1 className='text-center'>Twitter</h1>
        <form
          className='twitter-composer col-12 d-flex flex-column align-items-center mt-4'
          onSubmit={this.handleSubmit}
        >
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
          <div className='col-6 d-flex justify-content-around mt-3'>
            <button className='btn btn-primary'>Upload Image</button>
            <button className='btn btn-primary' type='submit'>
              Tweet
            </button>
          </div>
        </form>
        <div className='content col-12 d-flex flex-column align-items-center mt-5'>
          <div className='card-deck h-50 w-50'>
            {this.state.tweets.map((tweet) => (
              <div className='tweet card border mb-5' key={tweet.id}>
                <div className='card-body d-flex flex-column'>
                  <button className={'btn btn-sm border align-self-end' + (currentUser !== tweet.username ? ' d-none' : '')} onClick={() => this.handleDeleteTweet(tweet.id)}>
                    Delete
                  </button>
                  <Link
                    to={`/home/${tweet.username}`}
                    className='h6 btn fw-light p-0 align-self-start'
                  >
                    @{tweet.username}
                  </Link>
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
  }
}

export default Feed;
