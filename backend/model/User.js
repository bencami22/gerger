var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
         email: { type: String },
         firstName: { type: String, index: true },
         lastName: { type: String },
         avatarUrl: { type: String },
         locality: { type: String },
         extUIds: [{ uid: { type: String, index: true }, provider: String }],
         password: { type: String },
         role: { type: String },
         dtTimestamp: { type: Date, default: Date.now },
         resetPasswordTokens: [{ token: String, dtRequested: { type: Date, default: Date.now }, dtRedeemed: Date }]
});
var User = module.exports = mongoose.model('User', UserSchema);
