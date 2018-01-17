  var mongoose = require('mongoose');

  var complaints = [];
  var complaintModel = mongoose.model('Complaint');

  exports.sendComplaints = function sendComplaints(socket) {
    return new Promise(function(resolve, reject) {
      if (complaints.length == 0) {
        return complaintModel.find()
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
      }
      resolve();
    }).then(function() {
      complaints.forEach(function(data) {
        console.log("Emitting: " + data);
        socket.emit('complaintrec', data);

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

      complaints.push(returnData);
      resolve(returnData);
    });
  }
  