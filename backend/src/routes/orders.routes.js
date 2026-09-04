const express = require('express');
const controller = require('../controllers/orders.controller');

const router = express.Router();

router.get('/', controller.list);   // admin-only, see controller
router.post('/', controller.create);

module.exports = router;
