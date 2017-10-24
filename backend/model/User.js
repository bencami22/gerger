var mongoose = require('mongoose'); 

var UserSchema = new mongoose.Schema({
         email: {type: String},
         username: { type: String, index:true },
         password: { type: String},
         role : { type : String}
        });
var User = module.exports = mongoose.model('User', UserSchema);