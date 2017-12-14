var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
         email: { type: String },
         username: { type: String, index: true },
         password: { type: String },
         role: { type: String },
         dtTimestamp: { type: Date, default: Date.now },
         resetPasswordTokens: [{ token: String, dtRequested: { type: Date, default: Date.now }, dtRedeemed: Date }]
});
var User = module.exports = mongoose.model('User', UserSchema);
