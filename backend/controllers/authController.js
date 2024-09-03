const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};
const googleLogin = async (req, res) => {
  try {
    let user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      user = await User.create({
        googleId: req.user.googleId,
        username: req.user.username,
        email: req.user.email,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

   
    res.redirect(`http://localhost:5173/homepage?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: 'Google login failed' });
  }
};

module.exports = { registerUser, loginUser, logoutUser, googleLogin };
