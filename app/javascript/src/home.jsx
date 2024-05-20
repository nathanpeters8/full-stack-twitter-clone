import React from 'react'
import ReactDOM from 'react-dom'
import { GetAllTweets, UserSignOut, PostTweet } from './requests';

import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      username: '',
      message: ''
    };
  }

  componentDidMount() {
    GetAllTweets((tweets) => {
      this.setState({ tweets: tweets });
      console.log(tweets);
    });
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    PostTweet(this.state.message, () => {
      GetAllTweets((tweets) => {
        this.setState({ tweets: tweets });
      });
      this.setState({ message: '' });
    });
  }

  render() {
    return(
      <div className='row'>
        <div className='col-3 bg-light vh-100 d-flex align-items-center justify-content-center text-center position-sticky top-0'>
          <nav className='navbar'>
            <ul className='navbar-nav'>
              <li className='nav-item my-4'>
                <h4 className='nav-link'>@user_name</h4>
              </li>
              <li className='nav-item my-2'>
                <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
                  Search
                </a>
              </li>
              <li className='nav-item my-2'>
                <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
                  Notifications
                </a>
              </li>
              <li className='nav-item my-2'>
                <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
                  Messages
                </a>
              </li>
              <li className='nav-item my-2'>
                <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
                  Log Out
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='col-9'>
          <h1 className='text-center'>Twitter</h1>
          <form className='twitter-composer col-12 d-flex flex-column align-items-center mt-4' onSubmit={this.handleSubmit}>
            <div className='col-8'>
              <input className='form-control form-control-lg' type='text' name='' id='' placeholder="What's Happening?" value={this.state.message} onChange={this.handleMessageChange} />
            </div>
            <div className='col-6 d-flex justify-content-around mt-3'>
              <button className='btn btn-primary'>Upload Image</button>
              <button className='btn btn-primary' type='submit'>Tweet</button>
            </div>
          </form>
          <div className='content col-12 d-flex flex-column align-items-center mt-5'>
            {this.state.tweets.map((tweet) => (
              <div className='tweet border mb-4' key={tweet.id}>
                <h6 className='fw-light text-center'>@my_username</h6>
                <h5 className='text-center'>{tweet.message}</h5>
                <img src='https://picsum.photos/600/500' alt='placeholder' />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// const Home = (props) => (
//   <div className='row'>
//     <div className='col-3 bg-light vh-100 d-flex align-items-center justify-content-center text-center position-sticky top-0'>
//       <nav className='navbar'>
//         <ul className='navbar-nav'>
//           <li className='nav-item my-4'>
//             <h4 className='nav-link'>@user_name</h4>
//           </li>
//           <li className='nav-item my-2'>
//             <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
//               Search
//             </a>
//           </li>
//           <li className='nav-item my-2'>
//             <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
//               Notifications
//             </a>
//           </li>
//           <li className='nav-item my-2'>
//             <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
//               Messages
//             </a>
//           </li>
//           <li className='nav-item my-2'>
//             <a href='#' className='nav-link btn btn-primary text-light p-4 py-3'>
//               Log Out
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//     <div className='col-9'>
//       <h1 className='text-center'>Twitter</h1>
//       <div className='twitter-composer col-12 d-flex flex-column align-items-center mt-4'>
//         <div className='col-8'>
//           <input className='form-control form-control-lg' type='text' name='' id='' placeholder="What's Happening?" />
//         </div>
//         <div className='col-6 d-flex justify-content-around mt-3'>
//           <button className='btn btn-primary'>Upload Image</button>
//           <button className='btn btn-primary'>Tweet</button>
//         </div>
//       </div>
//       <div className='content col-12 d-flex flex-column align-items-center mt-5'>
//         <div className='tweet border mb-4'>
//           <h6 className='fw-light text-center'>@user_name</h6>
//           <h5 className='text-center'>this is an example tweet.</h5>
//           <img src='https://picsum.photos/600/500' alt='placeholder' />
//         </div>
//         <div className='tweet border mb-4'>
//           <h6 className='fw-light text-center'>@user_name</h6>
//           <h5 className='text-center'>this is an example tweet.</h5>
//           <img src='https://picsum.photos/600/500' alt='placeholder' />
//         </div>
//         <div className='tweet border mb-4'>
//           <h6 className='fw-light text-center'>@user_name</h6>
//           <h5 className='text-center'>this is an example tweet.</h5>
//           <img src='https://picsum.photos/600/500' alt='placeholder' />
//         </div>
//       </div>
//     </div>
//   </div>
// );

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
