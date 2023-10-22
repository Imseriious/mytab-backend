const express = require('express');
const { signupUser, loginUser, refreshUserToken } = require('../controllers/userController')

const router = express.Router()

//login router
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//signup route
router.post('/refresh_token', refreshUserToken)


module.exports = router