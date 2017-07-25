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
* `cd` into `private/db/`.
* Copy and paste the SQL statements from `initialize_db.sql` to get a working local database.
* Dump the data from `mock_data.sql` into your `users` table by running:
  * `psql nameTBD < private/db/mock_data.sql`
* Open `private/config.js` and add a `connectionString` property that connects to the `nameTBD` database.
    * `postgres://username:password@localhost/nametbd`

## Developer Mode
* `cd` into `public/` and run `npm install`.
* `cd` into `private/` and run `npm install`.
* `cd` into `private/` and run `npm run dev` to start the API in developer mode.
* `cd` into `public/` and run `npm start` to start the development server. 

## Production Mode
* `cd` into `private/` and run `npm install`.
* Then run `npm run prod` to start the API in production mode.
* Go to `http://localhost:3000/` in your browser.
