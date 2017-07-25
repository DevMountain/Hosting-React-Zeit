const passport = require('passport');

module.exports = {
  login: ( req, res, next ) => {
    passport.authenticate('auth0', { successRedirect: 'sendUserToClient', failureRedirect: '/login', failureFlash: true });
  },

  sendUserToClient: ( req, res, next ) => {
    if ( !req.user ) {
      res.redirect('/api/login');
    } else {
      res.status(200).send( req.user );
    }
  }
}