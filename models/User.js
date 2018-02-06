const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
// const passportLocalMongoose = require("passport-local-mongoose");

// define the schema for our user model
const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);