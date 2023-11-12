const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.signUpGET);

router.post('/', authController.signUpPOST);

module.exports = router;
