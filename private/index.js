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

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser( (user, done) => done(null, { id: user.id, picture: user.picture }) );
passport.deserializeUser( (obj, done) => {
  // See if the user is in the database and grab their information
  // If the user is not in the database, add them in
  done(null, obj);
});

// Routes
app.use(`/api/auth`, require(`${__dirname}/routes/auth_router.js`));

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port 3000.\nMode: ${process.env.ENV}`); } );

