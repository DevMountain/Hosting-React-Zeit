const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require(`${__dirname}/../controllers/auth_controller.js`);

router.get('/login',  passport.authenticate('auth0', {
  successRedirect: process.env.SUCCESS_REDIRECT,
  failureRedirect: process.env.FAILURE_REDIRECT,
  failureFlash: true
}));

router.get('/authenticated', authController.sendUserToClient);
router.post('/logout', authController.logout);

module.exports = router;
