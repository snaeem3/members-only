const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.loginGET);
router.post('/', authController.loginPOST);

module.exports = router;
