  var mongoose = require('mongoose');

  var complaints = [];
  var complaintModel = mongoose.model('Complaint');

  exports.sendComplaints = function sendComplaints(socket) {
    var complaintsLoaded = new Promise(function(resolve, reject) {
      if (complaints.length == 0) {
        complaintModel.find({}, function(err, docs) {
          docs.forEach(function(element) {
            console.log("Retrieved from and adding to collection: " + element);
            complaints.push(element);
          });
          resolve();
        });
      }
      else {
        resolve();
      }
    });

    complaintsLoaded.then(function() {
      //sending previous complaints
      complaints.forEach(function(data) {
        console.log("Emitting: " + data);
        socket.emit('complaint', data);
      });
    });
  }

  exports.complaint = function complaint(data, ip) {
    if (!data || !data.title || !data.content)
      return;

    var complaint = new complaintModel();
    complaint.author = data.author;
    complaint.title = data.title;
    complaint.content = data.content;
    complaint.ip = ip;

    complaint.save(function(err, product, numAffected) {
      if (!err) {
        console.log('Success!');
      }
      else {
        console.log('Error saving to mongoDB! Error:' + err);
      }

    });

    complaintModel.find({}, function(err, docs) {
      if (!err) {
        docs.forEach(function(element) {
          console.log(element);
        });
      }
    });

    var data = {
      author: complaint.author,
      title: complaint.title,
      content: complaint.content
    };

    complaints.push(data);
    return data;
  };
  