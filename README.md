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
