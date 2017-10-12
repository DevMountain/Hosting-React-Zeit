const passport = require('passport');

module.exports = {
  sendUserToClient: ( req, res, next ) => {
    if ( !req.user ) {
      // False is sent when a user is not authenticated. This is for easy checking on the front-end
      res.status(200).send( false );
    } else {
      res.status(200).send( req.user );
    }
  },

  logout: ( req, res, next ) => {
    req.session.destroy();
    res.status(200).send();
  }
};
