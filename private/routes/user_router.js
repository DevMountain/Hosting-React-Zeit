const express = require('express');
const router = express.Router();
const user_controller = require(`${__dirname}/../controllers/user_controller.js`);

router.post('/patch/:id', user_controller.patch);
router.get('/list', user_controller.list);
router.get('/search', user_controller.search);

module.exports = router;