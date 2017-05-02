/**
 * Created by deadalter on 28.04.2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sessionSchema = new Schema({
    login: {type: String, index: true},
    series: {type: String, index: true},
    token: {type: String, index: true}
});

sessionSchema.pre('save', function(next){
    this.token = this.randomToken();
    if(this.isNew){
        this.series = this.randomToken();
    }
    next();
});

sessionSchema.method('randomToken', function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
});

sessionSchema.virtual('id')
    .get(function(){
        return this._id.toHexString();
    });

sessionSchema.virtual('cookieValue')
    .get(function(){
        return JSON.stringify({ login: this.email, token: this.token, series: this.series });
    });

module.exports.sessionSchema = sessionSchema;