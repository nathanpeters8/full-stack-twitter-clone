import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserSignOut, Authenticate, SearchTweets } from './requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Feed from './feed';
import Profile from './profile';
import './home.scss';

const Home = () => {
  const [username, setUsername] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    Authenticate((response) => {
      if (response.authenticated) {
        setUsername(response.username);
      } else {
        window.location.href = '/login';
      }
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search === '') {
      setShowSearchResults(false);
      setSearchResults([]);
      alert('Please enter a search term');
    } else {
      SearchTweets(search, (response) => {
        setSearchResults(response);
        setShowSearchResults(true);
      });
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    UserSignOut(() => {
      Authenticate((response) => {
        if (!response.authenticated) {
          window.location.href = '/login';
        }
      });
    });
  };

  return (
    <Router>
      <div className='container-xxl'>
        <div className='row'>
          <div
            className={
              'col-12 col-md-4 col-xl-3 bg-light d-flex align-items-center justify-content-center border ' +
              (windowWidth >= 768 ? 'position-sticky top-0 vh-100 h-100 border-right' : 'border-bottom')
            }
          >
            <nav className={'navbar ' + (windowWidth < 768 ? 'navbar-expand-sm' : '')}>
              <ul className='navbar-nav d-flex align-items-center gap-2'>
                <li className={'nav-item ' + (windowWidth >= 768 ? 'my-1' : '')}>
                  <Link to={`/home/${username}`}>
                    <h4 className='nav-link'>@{username}</h4>
                  </Link>
                </li>
                <hr className={'w-100 mb-5 ' + (windowWidth < 768 ? 'd-none' : '')} />
                <li className={'nav-item ' + (windowWidth >= 768 ? 'my-4' : '')}>
                  <form className='btn-group' onSubmit={handleSearchSubmit}>
                    <input
                      className={'form-control ' + (windowWidth >= 768 ? '' : 'form-control-sm')}
                      type='search'
                      name='tweet-search'
                      placeholder='Search'
                      onChange={(event) => setSearch(event.target.value)}
                      value={search}
                    />
                    <button className='btn btn-sm btn-secondary' type='submit'>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                  </form>
                </li>
                <li className={'nav-item ' + (windowWidth >= 768 ? 'my-4' : '')}>
                  <Link
                    to='/home'
                    className={
                      'nav-link p-4 py-3 btn ' +
                      (windowWidth >= 768 ? ' btn-primary text-light' : 'btn-sm text-decoration-underline navbar-sm')
                    }
                  >
                    Home
                  </Link>
                </li>
                <li className={'nav-item ' + (windowWidth >= 768 ? 'my-2' : '')}>
                  <button
                    className={
                      'nav-link p-4 py-3 btn ' +
                      (windowWidth >= 768 ? ' btn-primary text-light' : 'btn-sm text-decoration-underline navbar-sm')
                    }
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className='col-12 col-md-8 col-xl-9 px-0 mb-0 pb-0 h-100 bg-secondary'>
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
                <Profile
                  currentUser={username}
                  windowWidth={windowWidth}
                  searchResults={searchResults}
                  showSearchResults={showSearchResults}
                  searchTerm={search}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Home />, document.body.appendChild(document.createElement('div')));
});
