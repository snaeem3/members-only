const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Message = require('../models/message');

exports.newMessageGET = asyncHandler(async (req, res, next) => {
  res.render('new-message-form', { title: 'New Message', user: req.user });
});

exports.newMessagePOST = [
  body('messageText', 'Message must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      messageText: req.body.messageText,
      date: Date.now(),
      author: req.user,
    });
    if (req.user.memberStatus === 'none') {
      res.render('new-message-form', {
        title: 'New Message',
        messageText: req.body.messageText,
        errors: [{ msg: 'You must be a member or admin to create a message' }],
      });
    } else if (!errors.isEmpty()) {
      res.render('new-message-form', {
        title: 'New Message',
        messageText: req.body.messageText,
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/');
    }
  }),
];
