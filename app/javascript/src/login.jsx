import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

import './login.scss';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);


    // fetch('/sessions', safeCredentials({
    //   method: 'POST',
    //   body: JSON.stringify({
    //     user: {
    //       username: this.state.username,
    //       password: this.state.password,
    //     },
    //   }),
    // }))
    //   .then(handleErrors)
    //   .then(response => {
    //     console.log(response);
    // })
  }

  render() {
    return (
      <>
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            <input className='form-control form-control-lg' type='text' placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange} />
            <input className='form-control form-control-lg' type='password' placeholder='Password' value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            <button className='btn btn-primary' type='submit'>Log In</button>
            <hr />
            <Link className='btn btn-secondary' to='signup'>
              Sign Up
            </Link>
          </div>
        </form>
      </>
    );
  }
}
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
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
    console.log(this.state.username);
    console.log(this.state.email);
    console.log(this.state.password);


    fetch('api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        },
      }),
    }))
      .then(handleErrors)
      .then(response => {
        console.log(response);
    })
  }

  render() {
    return (
      <>
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            <input className='form-control form-control-lg' type='text' placeholder='Username' value={this.state.username} onChange={this.handleUsernameChange} />
            <input className='form-control form-control-lg' type='text' placeholder='Email Address' value={this.state.email} onChange={this.handleEmailChange} />
            <input className='form-control form-control-lg' type='password' placeholder='Password' value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            <button type='submit' className='btn btn-secondary'>Sign Up</button>
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

const PageLayout = (props) => (
  <Router>
    <div className="container">
      <h1 className='text-center my-4'>Twitter Clone</h1>
      <Switch>
        <Route path='/login' component={LogIn} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </div>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <PageLayout />,
    document.body.appendChild(document.createElement('div')),
  )
})
