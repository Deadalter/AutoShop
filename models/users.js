/**
 * Created by deadalter on 15.04.2017.
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    login: {type: String, lowercase: true, index: {unique: true}},
    hashedPassword: String,
    salt: String
});


userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._password; });

userSchema.virtual('id')
    .get(function(){
        return this._id.toHexString();
    });


userSchema.method('authenticate', function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
});

userSchema.method('makeSalt', function() {
    return Math.round((new Date().valueOf()* Math.random())) + '';
});

userSchema.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});


module.exports.userSchema = userSchema;
