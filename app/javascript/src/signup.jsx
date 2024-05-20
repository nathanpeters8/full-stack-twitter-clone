import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserSignIn, UserSignUp, Authenticate } from './requests';
import './signup.scss';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    UserSignUp(this.state.username, this.state.email, this.state.password,() => {
      UserSignIn(this.state.username, this.state.password,() => {
        Authenticate((response) => {
          if (response.authenticated) {
            window.location.href = '/home';
          }
        });
      });
    });
  };

  render() {
    return (
      <>
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='Email Address'
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              className='form-control form-control-lg'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            <button type='submit' className='btn btn-secondary'>
              Sign Up
            </button>
            <hr />
            <Link to='login' className='btn btn-primary'>
              Log In
            </Link>
          </div>
        </form>
      </>
    );
  }
}

export default SignUp;