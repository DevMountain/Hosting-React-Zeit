const express = require('express');
const router = express.Router();
const friend_controller = require(`${__dirname}/../controllers/friend_controller.js`);

router.get('/list', friend_controller.list);
router.post('/add', friend_controller.add);
router.post('/remove', friend_controller.remove);

module.exports = router;