  var mongoose = require('mongoose');

  var complaintModel = mongoose.model('Complaint');

  exports.sendComplaints = function sendComplaints(socket, ordering, limit, locality) {
    var complaints = [];
    return new Promise(function(resolve, reject) {
      var query;
      if (locality) {
        query = complaintModel.find({ locality: locality });
      }
      else {
        query = complaintModel.find();
      }
      return query
        .sort({ dtTimestamp: ordering })
        .limit(limit)
        .populate('user', 'firstName avatarUrl')
        .exec()
        .then(function(docs) {
          docs.forEach(function(element) {
            console.log("Retrieved from and adding to collection: " + element);
            complaints.push(element);
          });
          resolve();
        })
        .catch(function(err) {
          console.log(err);
        });
    }).then(function() {
      var reset = true;
      complaints.forEach(function(data) {
        var dataToSend = { reset: reset, data: data };
        socket.emit('complaintrec', dataToSend);
        reset = false;

      });
    }).catch(function(err) {
      console.log(err);
    });
  };

  exports.complaint = function complaint(complaintToAdd, ip) {
    return new Promise(function(resolve, reject) {
      if (!complaintToAdd || !complaintToAdd.title || !complaintToAdd.content)
        reject(false);

      var complaint = new complaintModel();
      complaint.user = complaintToAdd.user._id;
      complaint.title = complaintToAdd.title;
      complaint.content = complaintToAdd.content;
      complaint.locality = complaintToAdd.locality;
      complaint.anon = complaintToAdd.anon;
      complaint.ip = ip;
      complaint.fileUrls = complaintToAdd.fileUrls;

      complaint.save().then(function(doc) {
        console.log('Success!');
      }).catch(function(err) {
        console.log('Error saving to mongoDB! Error:' + err);
      });

      var returnData = {
        user: complaintToAdd.user,
        title: complaint.title,
        content: complaint.content,
        locality: complaint.locality,
        anon: complaint.anon,
        fileUrls: complaint.fileUrls,
        dtTimestamp: complaint.dtTimestamp
      };

      resolve(returnData);
    });
  }
  