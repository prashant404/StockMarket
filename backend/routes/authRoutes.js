const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser, googleLogin } = require('../controllers/authController');


require('../config/passport');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  googleLogin
);

module.exports = router;
