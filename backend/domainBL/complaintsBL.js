  var mongoose = require('mongoose');
  var utilitiesBL = require('./utilitiesBL');
  var complaintModel = mongoose.model('Complaint');
  var fs = require('fs');
  var path = require('path');

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
      var dataToSend = { reset: true };
      socket.emit('complaintrec', dataToSend);
      complaints.forEach(function(data) {
        var dataToSend = { reset: false, data: data };
        socket.emit('complaintrec', dataToSend);
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
        console.log('Complaint saved to db success!');
      }).catch(function(err) {
        console.log('Error saving complaint to mongoDB! Error:' + err);
      });

      fs.readFile(path.resolve(__dirname, '..', './mailtemplates/complaintSubmitted.html'), 'utf8', function(err, content) {

        if (err) {
          console.log('Error loading file. err+' + err);
        }
        else {

          var start, stop;
          if (complaint.anon) {
            start = content.indexOf("[Start]")
            stop = content.indexOf("[Stop]")
            content = content.replace(content.substr(start, (stop - start) + 7), '');
          }
          else {
            start = content.indexOf("[AnonStart]")
            stop = content.indexOf("[AnonStop]")
            content = content.replace(content.substr(start, (stop - start) + 10), '');
          }

          content = content.replace('[Start]', '');
          content = content.replace('[Stop]', '');
          content = content.replace('[AnonStart]', '');
          content = content.replace('[AnonStop]', '');

          content = content.replace('[FullName]', complaintToAdd.user.firstName + " " + complaintToAdd.lasName);
          content = content.replace('[FullName]', complaintToAdd.user.firstName + " " + complaintToAdd.lasName);
          content = content.replace('[Title]', complaint.title);
          content = content.replace('[Content]', complaint.content);
          content = content.replace('[Locality]', complaint.locality);
          content = content.replace('[Timestamp]', utilitiesBL.formatDate(complaint.dtTimestamp));
          content = content.replace('[UserEmail]', complaintToAdd.user.email);

          utilitiesBL.getLocalities().forEach(function(element) {
            if (element.Locality === complaint.locality) {
              //element.Email
              utilitiesBL.sendMail('gergermalta@gmail.com', 'Complaint submitted', content, 'gergermalta@gmail.com');
            }
          });
        }
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
  