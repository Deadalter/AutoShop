/**
 * Created by deadalter on 03.05.2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storeSchema = new Schema({
    itemName: String,
    count: Number
});


module.exports.storeSchema = storeSchema;