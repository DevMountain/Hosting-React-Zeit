const passport = require('passport');

module.exports = {
  setUser: ( req, res, next ) => {
    if ( req.user && !req.session.user ) {
      req.session.user = req.user;
    }

    res.redirect('http://localhost:3001/login');
  },

  sendUserToClient: ( req, res, next ) => {
    if ( !req.session.user ) {
      res.status(200).send( false );
    } else {
      res.status(200).send( req.session.user );
    }
  }
}