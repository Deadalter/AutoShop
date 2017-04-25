/**
 * Created by deadalter on 11.04.2017.
 */
var mongoose = require('mongoose');
var Users = require('../models/users');
var Orders = require('../models/orders');
var config = require('../app/config');
var url = 'mongodb://'+config.db.user+':'+config.db.password+'@ds159880.mlab.com:'+config.db.port+'/'+config.db.databases;

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});

var User = mongoose.model("Users", Users.userSchema);
var Order = mongoose.model("Orders", Orders.orderSchema);


module.exports.User = User;
module.exports.Order = Order;