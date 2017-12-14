var socketio = require('socket.io');
var async = require('async');
var mongoose = require('mongoose');
var complaintModel = mongoose.model('Complaint');
var userModel = mongoose.model('User');
var session = require('express-session');
var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid/v1');

module.exports.listen = function(server) {

  io = socketio.listen(server)

  var complaints = [];
  var sockets = [];

  io.on('connection', function(socket) {

    sockets.push(socket);

    socket.on('disconnect', function() {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('complaint', function(data) {
      complaint(data, socket.handshake.address.address);
    });

    socket.on('GetAllComplaints', function(data) {
      sendComplaints(socket);
    });

    socket.on('authentication', function(data, callback) {
      authenticate(data, socket.handshake.address, function(data) {

        var result = data;

        console.log("User Authenticated:" + result)

        if (result) {
          sendComplaints(socket);
        }
        callback(result);
      });
    });

    socket.on('registration', function(data, callback) {
      registration(data, socket.handshake.address, function(data) {
        var result = data;
        console.log("User registration:" + result)
        callback(result);
      });
    });

    socket.on('forgotPassword', function(data, callback) {
      forgotPassword(data.email, socket.handshake.address, function(data) {
        var result = data;
        console.log("Forgot Password:" + result)
        callback(result);
      });
    });

    socket.on('changePassword', function(data, callback) {
      userModel.findOne({
          resetPasswordTokens: { $elemMatch: { token: data.resetPasswordToken } }
        },
        function(err, userRetrieved) {

          //inform the callback of auth success/failure 
          if (err || !userRetrieved) {
            callback(false);
            return;
          }

          changePassword(userRetrieved.username, data.newPassword, function(err, data) {
            var result = data;
            console.log("Change Password:" + result)
            callback(result);
          });
        })
    });



    socket.on('identify', function(name) {
      socket._username = String(name.name || 'Anonymous'); //, function (err) {
      //updateRoster();
      // });
    });

    socket.on('logout', function() {
      logout();
    });

    socket.on('error', function(err) {
      console.error(err.stack);
    });

  });

  function sendComplaints(socket) {
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

  function changePassword(username, newPassword, callback) {
    userModel.findOne({ username: username }, function(err, userRetrieved) {

      //inform the callback of auth success/failure 
      if (err || !userRetrieved) {
        callback(null, false);
        return;
      }

      userRetrieved.password = hashPassword(newPassword);

      userRetrieved.save();

      callback(null, true);
    });
    callback(null, false);
  }

  function registration(data, ip, callback) {
    var username = data.username;
    var password = data.password;
    var email = data.email;

    userModel.findOne({ username: username }, function(err, userRetrieved) {

      //inform the callback of auth success/failure 
      if (err || userRetrieved) {
        console.log('User found:' + userRetrieved + ' Error:' + err);
        callback(false);
        return;
      }

      console.log('User found:' + userRetrieved + ' validating password hash...');

      var newUser = new userModel();
      newUser.email = data.email;
      newUser.username = data.username;
      newUser.password = hashPassword(data.password);
      newUser.role = 'regular';

      newUser.save(function(err, product, numAffected) {
        if (!err) {
          console.log('Success!');
          callback(true);
        }
        else {
          console.log('Error saving to mongoDB! Error:' + err);
          callback(false);
        }

      });
    });
  }

  function logout() {
    session.username = null;
  }

  function forgotPassword(data, ip, callback) {
    var email = data;

    userModel.findOne({ email: email }, function(err, userRetrieved) {

      //inform the callback of auth success/failure 
      //if (err || !userRetrieved) {
      // console.log('User not found.');
      //  callback(false);
      //  return;
      //}

      console.log('User found:' + userRetrieved + ' validating password hash...');

      fs.readFile(path.resolve(__dirname, '..', 'backend/mailtemplates/resetpassword.html'), 'utf8', function(err, content) {

        if (err) {
          console.log('Error loading file. err+' + err);
        }
        else {
          var resetPasswordToken = new Object();
          resetPasswordToken.token = uuid();

          userRetrieved.resetPasswordTokens.push(resetPasswordToken);
          userRetrieved.save();

          sendMail(userRetrieved.email, 'Reset password', content.replace('[link]', 'https://gerger-bencami.c9users.io/resetpassword?token=' + resetPasswordToken.token));
        }

      });

    });
  }

  function authenticate(data, ip, callback) {
    //get credentials sent by the client 
    var username = data.username;
    var password = data.password;

    //if(session.username != undefined)
    //{
    //  callback('alreadyloggedin');
    //  return;
    //}


    var hashedValue = hashPassword(password);

    userModel.findOne({ username: username }, function(err, userRetrieved) {

      //inform the callback of auth success/failure 
      if (err || !userRetrieved) {
        callback(false);
        return;
      }

      console.log('User found:' + userRetrieved + ' validating password hash...');

      var passwordMatch = userRetrieved.password == hashedValue;
      if (passwordMatch) {
        session.username = userRetrieved.username;
      }
      else {
        userRetrieved = null;
      }

      console.log('Password Match:' + passwordMatch);

      callback(userRetrieved);
    });
  }

  function hashPassword(password) {
    var crypto = require('crypto'),
      key = 'mysecret key'

    // create hahs
    var hash = crypto.createHmac('sha256', key)
    hash.update(password)
    var hashedValue = hash.digest('hex');
    return hashedValue;
  }

  function complaint(data, ip) {
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
      docs.forEach(function(element) {
        console.log(element);
      });

    });

    var data = {
      author: complaint.author,
      title: complaint.title,
      content: complaint.content
    };

    broadcast('complaint', data);
    complaints.push(data);
  };

  function updateRoster() {
    async.map(
      sockets,
      function(socket, callback) {
        socket.get('name', callback);
      },
      function(err, names) {
        broadcast('roster', names);
      }
    );
  }

  function broadcast(event, data) {
    sockets.forEach(function(socket) {
      socket.emit(event, data);
    });
  }

  function sendMail(to, subject, htmlBody) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hgjduw6272hs@gmail.com',
          pass: 'hgjduw6272hs'
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"GerGer" <admin@gerger.com>', // sender address
        to: to, // list of receivers omma separated
        subject: subject, // Subject line
        //text: 'Hello world?', // plain text body
        html: htmlBody // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
    });
  }

}
