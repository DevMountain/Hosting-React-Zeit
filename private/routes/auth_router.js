const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require(`${__dirname}/../controllers/auth_controller.js`);

router.get('/login', passport.authenticate('auth0', { 
  successRedirect: '/api/auth/setUser', 
  failureRedirect: '/api/auth/login', 
  failureFlash: true 
}));

// router.get('/login', ( req, res,next ) => {
//   console.log('hit');
// });

router.get('/setUser', authController.setUser);
router.get('/authenticated', authController.sendUserToClient);
router.post('/logout', authController.logout);

module.exports = router;