const User = require("../models/User");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth-2");

module.exports = function (passport) {
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, done));

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
        function verify(email, password, done) {
            console.log("in local-login");
            User.findOne({ "local.email": email }, (err, user) => {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, { message: "Incorrect email." });
                if (!user.verifyPassword(password))
                    return done(null, false, { message: "Incorrect password." });
                return done(null, user);
            });
        })
    );

    passport.use("local-register",new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
        function (email, password, done) {
            User.findOne({ "local.email": email }, (err, user) => {
                if (err)
                    return done(err);
                if (user)
                    return done(null, false, { message: "Email is taken." });
                User.create( { 
                    "local.email": email, 
                    "local.password": User.generateHash(password) 
                }, (err, user) => {
                    if (err)
                        return done(err);
                    return done(null, user);
                });
            });
        }
    ));

}