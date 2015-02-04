var mongoose = require('mongoose');
var encryption = require('../utils/encryption');

var userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    salt: String,
    hashPass: String
});

userSchema.method({
    authenticate: function (password) {
        var isPasswordCorrect = encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        return isPasswordCorrect;
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;