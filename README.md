## Create the auth0 client
* Go to `manage.auth0.com`.
* Log in to your Auth0 account.
* Go to `Clients` using the left navigation bar.
* Create a new `Non Interactive Client` and name it `simulation 3`
* Open the `Settings` tab.
* Change the `Token Endpoint Authentication Method` to `Basic`.
* Change the `Allowed Callback URLs` to `http://localhost:3000/login`.
* Change the `Allowed Origins` to `http://localhost:3000`.
* Click `Save Changes`.
* Keep the page open, we'll need the `domain`, `client id`, and `secret` later.

## Create the auth0 strategy
* `cd` into `private/` and create a `strategy.js` file.
* Require the `passport-auth0` strategy in a variable called Auth0Strategy.
* Require `config.js` in a variable called `config`.
* Use `module.exports` to export a new Auth0Strategy.
  * <details>
  
    <summary> <code> Syntax </code> </summary>
    
    ```js
    module.exports = new Auth0Strategy({
      domain:       '...',
      clientID:     '...',
      clientSecret: '...',
      callbackURL:  '/login'
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
      }
    );
    ```
    
    </details>
* Modify the `domain`, `clientID`, and `clientSecret` to use the value from your `config.js` file.

## Create a config.js
* `cd` into `private/` and create a `config.js` file.
* Use `module.exports` to export an object with the following properties:
  * `domain`: This should equal your `domain` from `Auth0`.
  * `id`: This should equal your `Client Id` from `Auth0`.
  * `secret`: This should equal your `Client Secret` from `Auth0`.

## Create the database



## Developer Mode
`cd` into `public/` and run `npm install`.
`cd` into `private/` and run `npm install`.
Run `nodemon` to start the API.
`cd` into `public/` and run `npm start` to start the development server. 

## Production Mode
`cd` into `private/` and run `npm install`.
Run `nodemon`.
Go to `http://localhost:3000/` in your browser.
