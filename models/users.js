/**
 * Created by deadalter on 15.04.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema( {
    login: String ,
    password: String,
    type: String
});

module.exports.userSchema = userSchema;
