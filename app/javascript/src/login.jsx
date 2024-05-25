import React from 'react';
import { Link } from 'react-router-dom';
import { UserSignIn, Authenticate, GetUser } from './requests';

// Log In component
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validUsername: false,
    };
    // Debounce function to find user
    this.debouncedGetUser = this.debounce(this.findUser, 500);
  }

  // Debounce function to limit the number of API calls
  debounce = (func, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  // Handle username change
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.debouncedGetUser(event.target.value);
  };

  // Find user by username
  findUser = (username) => {
    if (username === '') {
      this.setState({ validUsername: false });
      return;
    }
    // get username and check if it is valid
    GetUser(username, (response) => {
      if (response.success) {
        this.setState({ validUsername: true });
      } else {
        this.setState({ validUsername: false });
      }
    });
  };

  // Handle password change
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  // Handle login form submission
  handleSubmit = (event) => {
    event.preventDefault();
    
    // return if username is invalid
    if (!this.state.validUsername) {
      return;
    }

    // Sign in user if valid username
    UserSignIn(this.state.username, this.state.password, function () {
      // Authenticate user and redirect to home page
      Authenticate((response) => {
        if (response.authenticated) {
          window.location.href = '/home';
        }
      });
    });
  };

  render() {
    return (
      <>
        {/* Log In form */}
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            {/* Username input */}
            <input
              className={
                'username-input form-control form-control-lg bg-opacity-50 mb-2 ' +
                (this.state.validUsername && this.state.username != '' ? 'bg-success' : '')
              }
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            {/* Password input */}
            <input
              className='form-control form-control-lg mb-2'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            {/* Log In button */}
            <button
              className={
                'btn ' +
                (this.state.validUsername && this.state.password > 5 ? 'btn-success' : 'disabled btn-secondary')
              }
              type='submit'
            >
              Log In
            </button>
            <hr />
            <Link className='btn btn-primary' to='signup'>
              Go To Sign Up
            </Link>
          </div>
        </form>
      </>
    );
  }
}

export default LogIn;