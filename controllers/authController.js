const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Returns true if the username is unique, false otherwise
const isUserNameUnique = async (username) => {
  const user = await User.findOne({ username });
  return !user;
};

exports.signUpGET = asyncHandler(async (req, res, next) => {
  res.render('sign-up', { title: 'Sign-Up', errors: [] });
});

exports.signUpPOST = [
  // Validate and sanitize fields
  body('displayName', 'Display Name must not be empty')
    .trim()
    .notEmpty()
    .escape(),
  body('userName', 'User Name must not be empty').trim().notEmpty().escape(),
  body('userName')
    .trim()
    .custom(async (value, { req }) => {
      if (!(await isUserNameUnique(value))) {
        throw new Error('Username is already taken');
      }
      return true;
    }),
  body('password', 'Password must be at least 6 characters')
    .isLength({ min: 6 })
    .escape(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) {
          return next(err); // Handle hashing error
        }

        const user = new User({
          displayName: req.body.displayName,
          userName: req.body.userName,
          password: hash,
        });

        if (!errors.isEmpty()) {
          res.render('sign-up', {
            title: 'Sign-Up',
            userName: req.body.userName,
            displayName: req.body.displayName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            errors: errors.array(),
          });
        } else {
          await user.save();
          res.redirect('/');
        }
      });
    });
  }),
];
