/**
 * Created by deadalter on 25.04.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    name: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    dateStart: {type: Date, default: Date.now},
    dateFinish: Date,
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
    desc: String
});

module.exports.orderSchema = orderSchema;