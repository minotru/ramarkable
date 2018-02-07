const User = require("../models/User");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");

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

    passport.use(new GoogleStrategy({
        clientID: "1032543868025-vk7g9bkc90s1ri94m6v54jt3an25f8qp.apps.googleusercontent.com",
        clientSecret: "D8bGF6zJ8lWordMzBEQBa9Lb",
        callbackURL: "http:/localhost:3000/auth/google/callback"
    },
        () => process.nextTick((accessToken, refreshToken, profile, done) => {
            console.log("profile");
            return done(null, profile);
        })
    )  
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