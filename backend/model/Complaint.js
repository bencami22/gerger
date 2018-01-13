var mongoose = require('mongoose');

var ComplaintSchema = new mongoose.Schema({
          user: { type: String, index: true },
          author: { type: String },
          title: { type: String },
          content: { type: String },
          anon: { type: Boolean },
          dtTimestamp: { type: Date, default: Date.now },
          ip: { type: String },
          fileUrls: [String]
});
var Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);
