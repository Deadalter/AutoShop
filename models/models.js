/**
 * Created by deadalter on 11.04.2017.
 */
var mongoose = require('mongoose');
var Users = require('../models/users');
var Sessions = require('../models/sessions');
var Orders = require('../models/orders');
var Clients = require('../models/clients');
var Stores = require('../models/stores');
var config = require('../app/config').confProduction;
var url = 'mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.host+':'+config.db.port+'/'+config.db.databases;

mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback () {
    console.log("Connected!")
});

var User = mongoose.model("Users", Users.userSchema);
var Order = mongoose.model("Orders", Orders.orderSchema);
var Client = mongoose.model("Clients", Clients.clientSchema);
var Store = mongoose.model("Stores", Stores.storeSchema);
//var Session = mongoose.model('Sessions', Sessions.sessionSchema);


module.exports.User = User;
//module.exports.Session = Session;
module.exports.Order = Order;
module.exports.Client = Client;
module.exports.Store = Store;