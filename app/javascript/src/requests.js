import { safeCredentials, safeCredentialsFormData, handleErrors } from '../utils/fetchHelper';

// get request to check if user is authenticated
export const Authenticate = (callback) => {
  fetch(
    '/api/authenticated',
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Authenticated:', response.authenticated);
      return callback(response);
    });
};

// post request to sign up a user
export const UserSignUp = (username, email, password, callback) => {
  fetch(
    'api/users',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Sign up:', response);
      return callback();
    });
};

// post request to sign in a user
export const UserSignIn = (username, password, callback) => {
  fetch(
    'api/sessions',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Sign in:', response);
      return callback();
    });
};

// delete request to sign out a user
export const UserSignOut = (callback) => {
  fetch(
    'api/sessions',
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('User signed out:', response);
      return callback();
    });
};

// post request to post a tweet
export const PostTweet = (message, image, callback) => {
  var formData = new FormData();
  formData.set('tweet[message]', message);
  // append image to form data if provided
  if (image) {
    formData.append('tweet[image]', image, image.name);
  }

  fetch(
    '/api/tweets',
    safeCredentialsFormData({
      method: 'POST',
      body: formData,
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Tweet posted:', response);
      return callback();
    });
};

// get request to get all tweets
export const GetAllTweets = (callback) => {
  fetch(
    '/api/tweets',
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('All tweets:', response);
      return callback(response.tweets);
    });
};

// delete request to delete a tweet
export const DeleteTweet = (id, callback) => {
  fetch(
    `/api/tweets/${id}`,
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Tweet deleted:', response);
      return callback();
    });
};

// get request to get tweets of a user
export const GetUserTweets = (username, callback) => {
  fetch(
    `/api/users/${username}/tweets`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('User tweets:', response.tweets);
      return callback(response.tweets);
    });
};

// get request to search tweets containing search term
export const SearchTweets = (search, callback) => {
  fetch(
    `/api/tweets/search/${search}`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Search results:', response.tweets);
      return callback(response.tweets);
    });
};

// get request to find if user exists
export const GetUser = (username, callback) => {
  fetch(
    `/api/users/${username}`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('User found:', response);
      return callback(response);
    });
};
