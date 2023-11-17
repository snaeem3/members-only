const express = require('express');

const router = express.Router();

const messageController = require('../controllers/messageController');

router.get('/new', messageController.newMessageGET);

router.post('/new', messageController.newMessagePOST);

module.exports = router;
