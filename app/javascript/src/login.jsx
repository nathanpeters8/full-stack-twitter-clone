import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './login.scss';

const LogIn = (props) => (
  <Router>
    <div className="container">
      <h1 className='text-center my-4'>Twitter Clone Log In</h1>
      <form className='d-flex flex-column align-items-center border py-3 px-0'>
        <div className="form-group col-6">
          <input className='form-control form-control-lg' type="text" placeholder="Username" />
          <input className='form-control form-control-lg' type="password" placeholder="Password" />
        </div>
        <div className="form-group col-4 d-flex flex-column mt-4">
          <button className="btn btn-primary">Log In</button>
          <hr />
          <button className="btn btn-secondary">Sign Up</button>
        </div>
      </form>
    </div>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LogIn />,
    document.body.appendChild(document.createElement('div')),
  )
})
