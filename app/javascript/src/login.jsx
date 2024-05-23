import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserSignIn, Authenticate, GetUser } from './requests';
import SignUp from './signup';
import './login.scss';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validUsername: false,
    };

    this.debouncedGetUser = this.debounce(this.findUser, 500);
  }

  debounce = (func, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.debouncedGetUser(event.target.value);
  };

  findUser = (username) => {
    console.log(username)
    GetUser(username, (response) => {
      if (response.success) {
        this.setState({ validUsername: true });
      } else {
        this.setState({ validUsername: false });
      }
    });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    UserSignIn(this.state.username, this.state.password, function () {
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
        <form className='d-flex flex-column align-items-center border py-3 px-0' onSubmit={this.handleSubmit}>
          <div className='form-group col-6'>
            <input
              className={
                'form-control form-control-lg bg-opacity-50 mb-2 ' +
                (this.state.validUsername ? 'bg-success' : 'bg-danger')
              }
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              className='form-control form-control-lg mb-2'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <div className='form-group col-4 d-flex flex-column mt-4'>
            <button className={'btn ' + (this.state.validUsername && this.state.password > 5 ? 'btn-success' : 'disabled btn-primary')} type='submit'>
              Log In
            </button>
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

const PageLayout = () => (
  <Router>
    <div className='container'>
      <h1 className='text-center my-4'>Twitter Clone</h1>
      <Switch>
        <Route path='/login' component={LogIn} />
        <Route path='/signup' exact component={SignUp} />
      </Switch>
    </div>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<PageLayout />, document.body.appendChild(document.createElement('div')));
});
