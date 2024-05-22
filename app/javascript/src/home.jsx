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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  return (
    <Router>
      <div className='row'>
        <div
          className={
            'col-12 col-md-3 bg-light d-flex align-items-center justify-content-center ' +
            (windowWidth > 768 ? 'position-sticky top-0 vh-100' : '')
          }
        >
          <nav className={'navbar ' + (windowWidth < 768 ? 'navbar-expand-sm' : '')}>
            <ul className='navbar-nav d-flex align-items-center gap-2'>
              <li className={'nav-item ' + (windowWidth > 768 ? 'my-1' : '')}>
                <h4 className='nav-link'>@{username}</h4>
              </li>
              <hr className={'w-100 mb-5 ' + (windowWidth < 768 ? 'd-none' : '') }/>
              <li className={'nav-item ' + (windowWidth > 768 ? 'my-4' : '')}>
                <form className='btn-group' onSubmit={handleSearchSubmit}>
                  <input
                    className={'form-control ' + (windowWidth > 768 ? '' : 'form-control-sm')}
                    type='search'
                    name='tweet-search'
                    placeholder='Search'
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                  />
                  <button className='btn btn-sm btn-secondary' type='submit'>
                    Search
                  </button>
                </form>
              </li>
              {/* {(() => {
                // if (!showSearchBar) {
                //   return null;
                // }
                return (

                );
              })()} */}
              <li className={'nav-item ' + (windowWidth > 768 ? 'my-4' : '')}>
                <button
                  className={
                    'nav-link p-4 py-3 btn ' +
                    (windowWidth > 768 ? ' btn-primary text-light' : 'btn-sm text-decoration-underline navbar-sm')
                  }
                >
                  Home
                </button>
              </li>
              {/* <li className={'nav-item ' + (windowWidth > 768 ? 'my-4' : '')}>
                <button
                  className={
                    'nav-link p-4 py-3 btn ' +
                    (windowWidth > 768 ? ' btn-primary text-light' : 'btn-sm text-decoration-underline') + (showSearchBar ? ' d-none' : '')
                  }
                  onClick={handleShowSearchBar}
                >
                  Search
                </button>
              </li> */}
              <li className={'nav-item ' + (windowWidth > 768 ? 'my-2' : '')}>
                <button
                  className={
                    'nav-link p-4 py-3 btn ' +
                    (windowWidth > 768 ? ' btn-primary text-light' : 'btn-sm text-decoration-underline navbar-sm')
                  }
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path='/home' exact>
            <Feed
              currentUser={username}
              searchResults={searchResults}
              showSearchResults={showSearchResults}
              searchTerm={search}
              windowWidth={windowWidth}
            />
          </Route>
          <Route path='/home/*'>
            <Profile currentUser={username} />
          </Route>
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
