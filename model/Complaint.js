var mongoose = require('mongoose'); 

var ComplaintSchema = new mongoose.Schema({
          userId: { type: Number, index: true },
          title: { type: String},
          content: { type: String},
          date: { type: Date, default: Date.now },
          ip: { type: String }
        });
var Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);