const monogoose = require("mongoose");

const UserSchema = monogoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const User = monogoose.model("User", UserSchema);


module.exports = User;