const passport = require('passport');

module.exports = {
  setUser: ( req, res, next ) => {
    console.log('Inside setUser:', req.user);
    if ( req.user && !req.session.user ) {
      req.session.user = req.user;
    }

    if ( process.env.ENV === "development" ) {
      res.redirect('http://localhost:3001/auth');
    } else if ( process.env.ENV === "production" ) {
      res.redirect('http://localhost:3000/auth')
    } else {
      res.status(500).send(`The API wasn't started in development or production mode. Please refer to the documentation in the README.`);
    }
  },

  sendUserToClient: ( req, res, next ) => {
    if ( !req.session.user ) {
      // False is sent when a user is not authenticated for easy checking on the front-end
      res.status(200).send( false );
    } else {
      res.status(200).send( req.session.user );
    }
  },

  logout: ( req, res, next ) => {
    req.session.destroy();
    res.status(200).send();
  }
};