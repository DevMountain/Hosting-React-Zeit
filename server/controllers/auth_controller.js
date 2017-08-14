const passport = require('passport');

module.exports = {
  setUser: ( req, res, next ) => {
    console.log("Yoyoyo", req.user);
    if ( req.user && !req.session.user ) {
      req.session.user = req.user;
    }

    if ( process.env.NODE_ENV === "development" ) {
      res.redirect('http://localhost:3000/');
    } else if ( process.env.NODE_ENV === "production" ) {
      res.redirect('/');
    } else {
      res.status(500).send(`The API wasn't started in development or production mode. Please refer to the documentation in the README.`);
    }
  },

  sendUserToClient: ( req, res, next ) => {
    if ( !req.session.user ) {
      // False is sent when a user is not authenticated. This is for easy checking on the front-end
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
