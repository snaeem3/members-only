const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
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
  body('username', 'User Name must not be empty').trim().notEmpty().escape(),
  body('username')
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
          username: req.body.username,
          password: hash,
        });

        if (!errors.isEmpty()) {
          res.render('sign-up', {
            title: 'Sign-Up',
            username: req.body.username,
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

exports.loginGET = asyncHandler(async (req, res, next) => {
  res.render('log-in', { title: 'Log In' });
});

exports.loginPOST = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureMessage: true,
    failureFlash: true,
  })(req, res, next);
});
