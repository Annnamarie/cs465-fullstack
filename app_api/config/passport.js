const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/users');   

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email }).exec();
            if (!user || !user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect email or password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));


