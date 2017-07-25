const passport = require('passport');

module.exports = {
  login: ( req, res, next ) => {
    console.log('Login was hit');
    
  },

  sendUserToClient: ( req, res, next ) => {
    console.log('Send User to Client was hit');
    if ( !req.user ) {
      res.redirect('/api/login');
    } else {
      res.status(200).send( req.user );
    }
  }
}