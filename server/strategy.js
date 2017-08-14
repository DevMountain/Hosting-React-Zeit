const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
  domain:       process.env.DOMAIN,
  clientID:     process.env.ID,
  clientSecret: process.env.SECRET,
  callbackURL:  '/api/auth/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    console.log("------\nUser", profile, " has logged in\n-------");
    return done(null, profile);
  }
);
