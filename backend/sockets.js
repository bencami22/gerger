var socketio = require('socket.io');
var async = require('async');
var session = require('express-session');

var complaintsBL = require('./domainBL/complaintsBL');
var usersBL = require('./domainBL/usersBL');

module.exports.listen = function(server) {

  var io = socketio.listen(server);

  var sockets = [];

  io.on('connection', function(socket) {

    sockets.push(socket);

    socket.on('disconnect', function() {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('complaint', function(data, callback) {
      var complaint = complaintsBL.complaint(data, socket.handshake.address.address);
      broadcast('complaint', complaint);
      callback(true);
    });

    socket.on('GetAllComplaints', function(data) {
      complaintsBL.sendComplaints(socket);
    });

    socket.on('authentication', function(data, callback) {
      usersBL.authenticate(data, socket.handshake.address)
        .then(function(data) {
          var result = data;
          if (result) {
            console.log("User Authenticated:" + result);
            session.username = result.username;
            complaintsBL.sendComplaints(socket);
          }
          callback(result);
        })
        .catch(function() {
          callback(false);
        });
    });

    socket.on('authenticationOrCreate', function(data, callback) {
      usersBL.authenticateOrCreate(data, socket.handshake.address)
        .then(function(data) {
          var result = data;
          if (result) {
            console.log("User Authenticated:" + result);
            session.username = result.username;
            complaintsBL.sendComplaints(socket);
          }
          callback(result);
        })
        .catch(function() {
          callback(false);
        });
    });

    socket.on('registration', function(data, callback) {
      usersBL.registration(data, socket.handshake.address, function(data) {
        var result = data;
        console.log("User registration:" + result)
        callback(result);
      });
    });

    socket.on('forgotPassword', function(data, callback) {
      usersBL.forgotPassword(data.email, socket.handshake.address).then(function() {
          var result = data;
          console.log("Forgot Password:" + result)
          callback(result);
        })
        .catch(function() {
          callback(false);
        });
    });

    socket.on('changePassword', function(data, callback) {

      usersBL.changePassword(data.resetPasswordToken, data.newPassword)
        .then(function() {
          var result = data;
          console.log("Change Password:" + result)
          callback(result);
        })
        .catch(function() {

        });

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

  function logout() {
    session.username = null;
  }

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
}
