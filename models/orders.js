/**
 * Created by deadalter on 25.04.2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = new Schema({
    name: String,
    master: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    dateStart: {type: Date, default: Date.now},
    dateFinish: Date,
    itComplite: String,
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Clients'},
    vin: String,
    carModel: String,
    makedWork: [{
        name: String,
        dateMaked: {type: Date, default: Date.now},
        workPrice: Number,
        usedSpare: [{
            name: String,
            count: Number,
            cost: Number
        }]
    }],
    totalPrice: Number,
    desc: String
});

orderSchema.virtual('id')
    .get(function(){
        return this._id.toHexString();
    });


module.exports.orderSchema = orderSchema;