/**
 * Created by deadalter on 03.05.2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storeSchema = new Schema({
    itemName: String,
    count: Number
});

storeSchema.virtual('id')
    .get(function(){
        return this._id.toHexString();
    });

module.exports.storeSchema = storeSchema;