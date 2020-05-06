var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullName: {type:String, required:true},
    username: {type:String, required:true, max:100},
    password: {type:String, required:true},
    membership: {type:Boolean, required:true}
});

module.exports = mongoose.model('User', UserSchema);