const { User } = require('../models/reminders.model');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;



module.exports = function (passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({ username: username }, (err, foundUser) => {
                if (err) return done(null, err);
                if (!foundUser) return done(null, false);
                if (!bcrypt.compareSync(password, foundUser.password)) return done(null, false);
                return done(null, foundUser)
            })
        })
    )


//Serialize
passport.serializeUser((user, done) => {
    done(null, user._id)
})

//Deserialize
passport.deserializeUser((_id, done) => {
    User.findOne({ _id: _id }, (err, aUser) => {
        const cookie = {
            username: aUser.username,
            _id: aUser._id
        }
        done(err, cookie)
    })
})


}



