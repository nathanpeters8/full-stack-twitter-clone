import { safeCredentials, safeCredentialsFormData, handleErrors } from '../utils/fetchHelper';

export const Authenticate = () => {
  fetch('api/authenticated',
    safeCredentials({
      method: 'GET'
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    if(response.authenticated) {
      console.log('User authenticated!');
      window.location.href = '/home';
    }
  });
}

export const UserSignUp = (username, email, password, callback) => {
  fetch('api/users',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password
        },
      }),
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    return callback();
  });
};

export const UserSignIn = (username, password, callback) => {
  fetch('api/sessions',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        },
      }),
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    return callback();
  });
};

export const UserSignOut = () => {
  fetch('api/sessions',
    safeCredentials({
      method: 'DELETE'
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    window.location.href = '/';
  });
};

export const PostTweet = (message, callback) => {
  var formData = new FormData();
  formData.set('tweet[message]', message);

  fetch('/api/tweets',
    safeCredentialsFormData({
      method: 'POST',
      body: formData
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    return callback();
  });
};

export const GetAllTweets = (callback) => {
  fetch('/api/tweets',
    safeCredentials({
      method: 'GET'
    })
  )
  .then(handleErrors)
  .then((response) => {
    console.log(response);
    return callback(response.tweets);
  });
};

