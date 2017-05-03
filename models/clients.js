/**
 * Created by deadalter on 03.05.2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var clientSchema = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    orders: [{
        ordersId: {type: mongoose.Schema.Types.ObjectId, ref: 'Orders'}
    }],
    master: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});

clientSchema.virtual('id')
    .get(function(){
        return this._id.toHexString();
    });

module.exports.clientSchema = clientSchema;