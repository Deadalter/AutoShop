/**
 * Created by deadalter on 15.04.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


function passwordSet(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
}

function passwordGet() {
    return this._password;
}

function idGet() {
    return this._id.toHexString();
}

var userSchema = new Schema({
    login: {type: String, unique: true},
    password: {type: String, set: passwordSet, get: passwordGet},
    hashedPassword: String,
    salt: String,
    type: String
});

userSchema.method.authenticate = function(text) {
    return this.encryptPassword(text) === this.hashedPassword;
};

userSchema.method.makeSalt = function() {
    return Math.round((new Date().valueOf()* Math.random())) + '';
};

userSchema.method.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


module.exports.userSchema = userSchema;
