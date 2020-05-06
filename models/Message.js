var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {type:String, required:true},
    timestamp: {type:Date, required:true},
    messageBody: {type:String, required:true, max:250}
})

module.exports = mongoose.model('Message', MessageSchema);
