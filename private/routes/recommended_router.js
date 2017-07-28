const express = require('express');
const router = express.Router();
const recommended_controller = require(`${__dirname}/../controllers/recommended_controller.js`);

router.post('/', recommended_controller.find);
router.post('/add', recommended_controller.add);

module.exports = router;