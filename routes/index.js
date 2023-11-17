const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const allMessages = await Message.find({}).exec();
    res.render('index', {
      title: 'Members Only',
      user: req.user,
      messages: allMessages,
    });
  }),
);

module.exports = router;
