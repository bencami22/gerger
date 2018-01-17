var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplaintSchema = new mongoose.Schema({
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          title: { type: String },
          content: { type: String },
          locality: { type: String },
          anon: { type: Boolean },
          dtTimestamp: { type: Date, default: Date.now },
          ip: { type: String },
          fileUrls: [String]
});
var Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);
