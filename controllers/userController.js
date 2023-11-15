const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv').config();

exports.becomeMemberGET = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.redirect('/log-in');
  } else {
    res.render('update-membership', {
      title: 'Become a Member',
      type: 'Member',
    });
  }
});

exports.becomeMemberPOST = asyncHandler(async (req, res, next) => {
  if (req.body.membershipCode !== process.env.MEMBER_PASSCODE) {
    res.render('update-membership', {
      title: 'Become a Member',
      type: 'Member',
      errors: [{ msg: 'Incorrect member passcode' }],
    });
  } else {
    req.user.memberStatus = 'member';
    await req.user.save();
    res.redirect('/');
  }
});

exports.becomeAdminGET = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.redirect('/log-in');
  } else {
    res.render('update-membership', {
      title: 'Become an Admin',
      type: 'Admin',
    });
  }
});

exports.becomeAdminPOST = asyncHandler(async (req, res, next) => {
  if (req.body.membershipCode !== process.env.ADMIN_PASSCODE) {
    res.render('update-membership', {
      title: 'Become an Admin',
      type: 'Admin',
      errors: [{ msg: 'Incorrect admin passcode' }],
    });
  } else {
    req.user.memberStatus = 'admin';
    await req.user.save();
    res.redirect('/');
  }
});
