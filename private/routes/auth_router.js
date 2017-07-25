const express = require('express');
const router = express.Router();
const authController = require(`${__dirname}/../controllers/auth_controller.js`);

router.post('/login', authController.login);

module.exports = router;