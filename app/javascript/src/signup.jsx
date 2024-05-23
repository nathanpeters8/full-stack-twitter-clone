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
      validUsername: false,
      validEmail: false,
      validPassword: false,
    };
  }

  checkValidSignUp = () => {
    const { username, email, password } = this.state;


    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return false;
    }

    return true;
  }


  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value }, () => {
      if (event.target.value.length > 5 && event.target.value.length < 16) {
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(event.target.value)) {
          alert('Username cannot contain special characters');
          this.setState({validUsername: false});
        }
        else {
          this.setState({validUsername: true});
        }
      }
      else {
        this.setState({validUsername: false});
      }
    });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value }, () => {
      if (event.target.value.length > 0) {
        const emailCharacters = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailCharacters.test(event.target.value)) {
          this.setState({validEmail: false});
        }
        else {
          this.setState({validEmail: true});
        }
      }
      else {
        this.setState({validEmail: false});
      }
    });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value }, () => {
      if (event.target.value.length > 5 && event.target.value.length < 21) {
        this.setState({validPassword: true});
      }
      else {
        this.setState({validPassword: false});
      }
    });
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
    const { validUsername, validEmail, validPassword } = this.state;
    return (
      <>
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
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
            <button type='submit' className={'btn btn-secondary ' + (validUsername && validEmail && validPassword ? 'btn-success' : 'btn-secondary disabled')}>
              Sign Up
            </button>
            <hr />
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