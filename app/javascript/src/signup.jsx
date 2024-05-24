import React from 'react';
import { Link } from 'react-router-dom';
import { UserSignIn, UserSignUp, Authenticate } from './requests';

// Sign Up component
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      validUsername: false,
      validEmail: false,
      validPassword: false,
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value }, () => {
      // Username must be between 6 and 15 characters
      if (event.target.value.length > 5 && event.target.value.length < 16) {
        // Username cannot contain special characters
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(event.target.value)) {
          alert('Username cannot contain special characters');
          this.setState({ validUsername: false });
        } else {
          this.setState({ validUsername: true });
        }
      } else {
        this.setState({ validUsername: false });
      }
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      // Email must be at least 1 character
      if (event.target.value.length > 0) {
        // Email must be in the format of an email address
        const emailCharacters = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailCharacters.test(event.target.value)) {
          this.setState({ validEmail: false });
        } else {
          this.setState({ validEmail: true });
        }
      } else {
        this.setState({ validEmail: false });
      }
    });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      // Password must be between 6 and 20 characters
      if (event.target.value.length > 5 && event.target.value.length < 21) {
        this.setState({ validPassword: true });
      } else {
        this.setState({ validPassword: false });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // If all fields are valid, sign up the user
    UserSignUp(this.state.username, this.state.email, this.state.password, () => {
      // Sign in the user after signing up
      UserSignIn(this.state.username, this.state.password, () => {
        // Redirect to home page after authentication
        Authenticate((response) => {
          if (response.authenticated) {
            window.location.href = '/home';
          }
        });
      });
    });
  };

  render() {
    const { validUsername, validEmail, validPassword } = this.state;
    return (
      <>
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            {/* Username input */}
            <input
              className={
                'form-control form-control-lg bg-opacity-50 mb-2 ' +
                (this.state.validUsername ? 'bg-success' : 'bg-danger')
              }
              type='text'
              placeholder='Username    (6-15 characters, no special characters)'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            {/* Email input */}
            <input
              className={
                'form-control form-control-lg bg-opacity-50 mb-2 ' +
                (this.state.validEmail ? ' bg-success' : ' bg-danger')
              }
              type='text'
              placeholder='Email Address'
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            {/* Password input */}
            <input
              className={
                'form-control form-control-lg bg-opacity-50 mb-2 ' +
                (this.state.validPassword ? ' bg-success' : ' bg-danger')
              }
              type='password'
              placeholder='Password     (6-20 characters)'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            {/* Sign Up button */}
            <button
              type='submit'
              className={
                'btn btn-secondary ' +
                (validUsername && validEmail && validPassword ? 'btn-success' : 'btn-secondary disabled')
              }
            >
              Sign Up
            </button>
            <hr />
            {/* Go To Log In button */}
            <Link to='login' className='btn btn-primary'>
              Go To Log In
            </Link>
          </div>
        </form>
      </>
    );
  }
}

export default SignUp;
