const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users');   

const register = async (req, res) => {
  try {
      if (!req.body.name || !req.body.email || !req.body.password) {
          return res.status(400).json({ "message": "All fields required" });
      }

      const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: ''
      });

      await user.setPassword(req.body.password); // Make sure setPassword is async if using bcrypt
      const savedUser = await user.save();

      const token = savedUser.generateJwt();
      return res.status(200).json({ token });
  } catch (err) {
      return res.status(500).json({ message: "Error registering user", error: err });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ "message": "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return res.status(500).json({ "message": "Error during authentication", "error": err });
      }
      if (!user) {
          return res.status(401).json(info); // info contains the error message from passport
      }

      const token = user.generateJwt();
      return res.status(200).json({ token });
  })(req, res);
};


module.exports = {
  register,
  login
};
