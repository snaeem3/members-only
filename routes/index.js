const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}).exec();
    // Fetch user information for each message's author
    const messagesWithAuthors = await Promise.all(
      allMessages.map(async (message) => {
        const author = await User.findById(message.author).exec();
        return {
          ...message.toObject(),
          authorDisplayName: author ? author.displayName : 'Unknown User',
        };
      }),
    );
    res.render('index', {
      title: 'Members Only',
      user: req.user,
      messages: messagesWithAuthors,
    });
  }),
);

module.exports = router;
