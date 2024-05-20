import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserSignIn, Authenticate } from './requests';
import SignUp from './signup';
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
    UserSignIn(this.state.username, this.state.password, function() {
      Authenticate((response) => {
        if(response.authenticated) {
          window.location.href = '/home';
        }
      });
    });
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

const PageLayout = () => (
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
