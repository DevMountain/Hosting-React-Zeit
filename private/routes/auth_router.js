const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require(`${__dirname}/../controllers/auth_controller.js`);

router.get('/login', passport.authenticate('auth0', { 
  successRedirect: 'sendUserToClient', 
  failureRedirect: '/login', 
  failureFlash: true 
}));

module.exports = router;