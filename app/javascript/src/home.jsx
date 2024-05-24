import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserSignOut, Authenticate, SearchTweets } from './requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav } from 'react-bootstrap';
import Feed from './feed';
import Profile from './profile';
import './home.scss';

// Home component
const Home = () => {
  const [username, setUsername] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Check if user is authenticated on page load
  useEffect(() => {
    Authenticate((response) => {
      if (response.authenticated) {
        setUsername(response.username);
      } else {
        window.location.href = '/login';
      }
    });
  }, []);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (search === '') {
      // If search is empty, alert user
      setShowSearchResults(false);
      setSearchResults([]);
      alert('Please enter a search term');
    } else {
      // Search for tweets containing search term
      SearchTweets(search, (response) => {
        setSearchResults(response);
        setShowSearchResults(true);
      });
    }
  };

  // Handle log out button click
  const handleLogOut = (event) => {
    event.preventDefault();
    // Sign out user and redirect to login page
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
          {/* Nav Bar */}
          <div
            className={
              'col-12 col-md-4 col-xl-3 bg-light d-flex border ' +
              (windowWidth >= 768
                ? 'position-sticky top-0 vh-100 h-100 border-right align-items-center justify-content-center '
                : 'border-bottom')
            }
          >
            <Navbar expand='sm' className='ms-auto me-auto'>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav' className=''>
                <Nav
                  className={
                    'd-flex gap-2 ' + (windowWidth >= 768 ? 'flex-column align-items-center ' : 'align-items-center ')
                  }
                >
                  {/* Username nav link */}
                  <Nav.Item className={'nav-username nav-item ' + (windowWidth >= 768 ? 'my-1' : '')}>
                    <Link to={`/home/${username}`} className='text-decoration-none'>
                      <h4 className='text-primary'>@{username}</h4>
                    </Link>
                  </Nav.Item>
                  <hr className={'w-100 mb-5 ' + (windowWidth < 768 ? 'd-none' : '')} />
                  {/* Search form */}
                  <Nav.Item className={'nav-item ' + (windowWidth >= 768 ? 'my-4' : '')}>
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
                  </Nav.Item>
                  {/* Home link */}
                  <Nav.Item className={'nav-item ' + (windowWidth >= 768 ? 'my-4' : '')}>
                    <Link
                      to='/home'
                      className={
                        'p-4 py-3 btn ' +
                        (windowWidth >= 768
                          ? ' btn-primary text-light'
                          : 'btn-sm text-decoration-underline navbar-sm text-primary')
                      }
                    >
                      Home
                    </Link>
                  </Nav.Item>
                  {/* Log out link */}
                  <Nav.Item className={'nav-item ' + (windowWidth >= 768 ? 'my-2' : '')}>
                    <button
                      className={
                        'p-4 py-3 btn ' +
                        (windowWidth >= 768
                          ? ' btn-primary text-light'
                          : 'btn-sm text-decoration-underline navbar-sm text-primary')
                      }
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className='col-12 col-md-8 col-xl-9 px-0 mb-0 pb-0 h-100 bg-secondary'>
            {/* Routes to home and profile components */}
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
