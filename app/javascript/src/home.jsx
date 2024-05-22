import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { GetAllTweets, UserSignOut, PostTweet, Authenticate, DeleteTweet, GetUserTweets, SearchTweets } from './requests';
import Feed from './feed';
import Profile from './profile';
import './home.scss';

const Home = () => {
  const [username, setUsername] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    Authenticate((response) => {
      if(response.authenticated) {
        setUsername(response.username);
      }
      else {
        window.location.href = '/login';
      }
    });
  }, []);

  const handleShowSearchBar = (event) => {
    event.preventDefault();
    setShowSearchBar(!showSearchBar);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if(search === '') {
      setShowSearchResults(false);
      setSearchResults([]);
      alert('Please enter a search term');
    }
    else {
      SearchTweets(search, (response) => {
        setSearchResults(response);
        setShowSearchResults(true);
      });
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault();
    UserSignOut(() => {
      Authenticate((response) => { 
        if(!response.authenticated) {
          window.location.href = '/login';
        }
      });
    });
  }

  return(
    <Router>
      <div className="row">
        <div className='col-3 bg-light vh-100 d-flex align-items-center justify-content-center text-center position-sticky top-0'>
          <nav className='navbar'>
            <ul className='navbar-nav d-flex flex-column align-items-center'>
              <li className='nav-item my-4'>
                <h4 className='nav-link'>@{username}</h4>
              </li>
              {(() => {
                if(!showSearchBar) {
                  return null;
                }
                return (
                  <li className='nav-item my-2'>
                    <form className='btn-group' onSubmit={handleSearchSubmit}>
                      <input type='search' name='tweet-search' id='' onChange={(event) => setSearch(event.target.value)} value={search} />
                      <button className='btn btn-sm btn-secondary' type='submit'>Search</button>
                    </form>
                  </li>
                );
              })()}
              <li className='nav-item my-2'>
                <button className='nav-link btn btn-primary text-light p-4 py-3' onClick={handleShowSearchBar}>Search</button>
              </li>
              <li className='nav-item my-2'>
                <button className='nav-link btn btn-primary text-light p-4 py-3'>Notifications</button>
              </li>
              <li className='nav-item my-2'>
                <button className='nav-link btn btn-primary text-light p-4 py-3'>Messages</button>
              </li>
              <li className='nav-item my-2'>
                <button className='nav-link btn btn-primary text-light p-4 py-3' onClick={handleLogOut}>
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path='/home' exact>
            <Feed currentUser={username} searchResults={searchResults} showSearchResults={showSearchResults} searchTerm={search}/>
          </Route>
          <Route path='/home/*'>
            <Profile currentUser={username}/>
          </Route >
        </Switch>
      </div>
    </Router>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
