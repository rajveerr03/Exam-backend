const express = require('express');
const { login, verifyOtp, resetReq, resetPassword } = require('../Controllers/loginController');
const router = express.Router();

router.post('/login', login)
router.post('/verifyopt' , verifyOtp)
router.post('/forgotpassword' , resetReq)
router.patch('/newpassword' , resetPassword)

module.exports = router;