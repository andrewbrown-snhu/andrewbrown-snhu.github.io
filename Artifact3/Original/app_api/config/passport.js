//============================================================================
// Author      : Andrew Brown
// Date        : August 18, 2024
// Version     : 1.0
// Description : Database Connection File
//============================================================================

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    async (username, password, done) => {
        const q = await User
            .findOne({ email:username })
            .exec();

            if (!q) {
                return done(null, false, { message: 'Incorrect Username'});
            }

            if (!q.validPassword(password)) {
                return done(null, false, { message: 'Incorrect Password'});
            }

            return done(null, q);
    }
));