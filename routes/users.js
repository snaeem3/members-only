const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController.js');

/* GET become member */
router.get('/become-member', userController.becomeMemberGET);

router.post('/become-member', userController.becomeMemberPOST);

router.get('/become-admin', userController.becomeAdminGET);

router.post('/become-admin', userController.becomeAdminPOST);

module.exports = router;
