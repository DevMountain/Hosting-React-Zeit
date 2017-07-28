const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require(`${__dirname}/config.js`);
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();

massive( config.connectionString ).then( dbInstance => {
  app.set('db', dbInstance);
}).catch( err => console.log('Error on connecting to database:', err) );

app.use(session({
  secret: '@f8!l m 0 Rtz',
  resave: false,
  saveUninitialized: false
}));

app.use( bodyParser.json() );
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser( (user, done) => done(null, { id: user.id, picture: user.picture }) );
passport.deserializeUser( (obj, done) => {
  const db = app.get('db');

  db.users.find_user([ obj.id ]).then( response => {
    if ( response.length === 1 ) {
      // User is in the database
      done(null, response[0]);
    } else if ( response.length === 0 ) {
      // User is not in the database - Add them in
      db.users.add_user([ obj.id, obj.picture ]).then( response => {
        done(null, response[0]);
      });
    }
  });
});

// Routes
app.use(`/api/auth`, require(`${__dirname}/routes/auth_router.js`));
app.use(`/api/user`, require(`${__dirname}/routes/user_router.js`));
app.use(`/api/friend`, require(`${__dirname}/routes/friend_router.js`));
app.use(`/api/recommended`, require(`${__dirname}/routes/recommended_router.js`));

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port 3000.\nMode: ${process.env.ENV}`); } );

