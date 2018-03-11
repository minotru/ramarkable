const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Note = require("../models/Note");

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
    },
    folderId: mongoose.SchemaTypes.ObjectId,
    name: String
});

userSchema.pre("save", function(next) {
    Note.create({type: "folder"})
        .then(note => {
            this.folderId = note.id;
            next();
        })
        .catch(err => next(err));
});

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

userSchema.set("toJSON", {
    transform: function(doc, ret, options) {
        return {
            id: ret._id,
            name: ret.name,
            folderId: ret.folderId
        }
    }
})

module.exports = mongoose.model('User', userSchema);