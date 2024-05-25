import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './signup';
import LogIn from './login';
import './landing_page.scss';

// Landing Page component
const LandingPage = () => {
  return (
    <Router>
      <div className='container'>
        <h1 className='text-center my-4'>Twitter Clone</h1>
        <Switch>
          <Route path='/login' exact component={LogIn} />
          <Route path='/signup' exact component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<LandingPage />, document.body.appendChild(document.createElement('div')));
});
