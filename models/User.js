const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

// define the schema for our user model
const userSchema = mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model('User', userSchema);