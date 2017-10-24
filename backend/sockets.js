var socketio = require('socket.io');
var async = require('async');
var mongoose = require('mongoose');
var complaintModel = mongoose.model('Complaint'); 
var userModel = mongoose.model('User'); 
var session = require('express-session');
module.exports.listen = function(server){

io = socketio.listen(server)

var complaints = [];
var sockets = [];

io.on('connection', function (socket) {
  
    var complaintsLoaded= new Promise(function(resolve, reject){
      if(complaints.length==0)
      {
        complaintModel.find({}, function (err, docs) {
          docs.forEach(function(element) {
            console.log("Retrieved from and adding to collection: "+element);
            complaints.push(element);
        });
        resolve();
        });
      }
      else
      {
        resolve();
      }
    });
    
    complaintsLoaded.then(function()
    {
      //sending previous complaints
          complaints.forEach(function (data) {
              console.log("Emitting: "+data);
              socket.emit('complaint', data);
            });
    });
    
    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('complaint', function (data){
      complaint(data, socket.handshake.address.address);
    });
    
    socket.on('authentication', function (data, callback){
      authenticate(data, socket.handshake.address, function(data){
        var result=data;
        console.log("User Authenticated:"+result)
        callback(result);
      });
    });
    
    socket.on('registration', function (data, callback){
      registration(data, socket.handshake.address, function(data){
        var result=data;
        console.log("User registration:"+result)
        callback(result);
      });
    });
    
    socket.on('forgotPassword', function (data, callback){
      forgotPassword(data, socket.handshake.address, function(data){
        var result=data;
        console.log("Forgot Password:"+result)
        callback(result);
      });
    });
    
   
    socket.on('identify', function (name) {
      socket._username=String(name.name || 'Anonymous');//, function (err) {
        //updateRoster();
     // });
    });
    
    socket.on('logout', function(){
      logout();
    });
    
     socket.on('error', function(err){
     console.error(err.stack);
   });
   
});

function registration(data, ip, callback)
{
    var username = data.username;
    var password = data.password;
    var email=data.email;
    
    userModel.findOne({username:username}, function (err, userRetrieved) {
          
      //inform the callback of auth success/failure 
      if (err || userRetrieved)
      {
        console.log('User found:'+userRetrieved+' Error:'+err);
        callback(false);
        return;
      }
      
      console.log('User found:'+userRetrieved+' validating password hash...');
      
      var newUser=new userModel();
      newUser.email = data.email;
      newUser.username = data.username;
      newUser.password=hashPassword(data.password);
      newUser.role = 'regular';
      
      newUser.save(function (err, product, numAffected) {
        if (!err) 
        {
          console.log('Success!');
          callback(true);
        }
        else
        {
          console.log('Error saving to mongoDB! Error:'+err);
          callback(false);
        }
        
      });
      
      
    });
}

function logout(callback)
{
  session.username = null;
  callback()
}

function forgotPassword(data, ip, callback)
{
    var username = data.username;
    var password = data.password;
    var email=data.email;
    
    userModel.findOne({username:username}, function (err, userRetrieved) {
          
      //inform the callback of auth success/failure 
      if (err || userRetrieved)
      {
        console.log('User found:'+userRetrieved+' Error:'+err);
        callback(false);
        return;
      }
      
      console.log('User found:'+userRetrieved+' validating password hash...');
      var newUser=new userModel();
      newUser.email = data.email;
      newUser.username = data.username;
      newUser.password= hashPassword(data.password);
      
      newUser.save(function (err, product, numAffected) {
        if (!err) 
        {
          console.log('Success!');
          callback(true);
        }
        else
        {
          console.log('Error saving to mongoDB! Error:'+err);
          callback(false);
        }
        
      });
      
      
    });
}

function authenticate(data, ip, callback)
{
  //get credentials sent by the client 
    var username = data.username;
    var password = data.password;
    
    //if(session.username != undefined)
    //{
    //  callback('alreadyloggedin');
    //  return;
    //}
    
   
    var hashedValue = hashPassword(password);

    userModel.findOne({username:username}, function (err, userRetrieved) {
          
      //inform the callback of auth success/failure 
      if (err || !userRetrieved)
      {
        callback(false);
        return;
      }
      
      console.log('User found:'+userRetrieved+' validating password hash...');
      
      var passwordMatch=userRetrieved.password == hashedValue;
      if(passwordMatch)
      {
        session.username = userRetrieved.username;
      }
      
      console.log('Password Match:'+passwordMatch);
      
      callback(userRetrieved.role);
    });
}

function hashPassword(password)
{
  var crypto = require('crypto'),
      key = 'mysecret key'
      
      // create hahs
  var hash = crypto.createHmac('sha256', key)
  hash.update(password)
  var hashedValue = hash.digest('hex');
  return hashedValue;
}
function complaint(data, ip){
if (!data || ! data.title || ! data.content )
        return;
        
        var complaint=new complaintModel();
        complaint.author = data.author;
        complaint.title = data.title;
        complaint.content = data.content;
        complaint.ip = ip;
        
        complaint.save(function (err, product, numAffected) {
          if (!err) 
          {
            console.log('Success!');
          }
          else
          {
            console.log('Error saving to mongoDB! Error:'+err);
          }
          
        });
        
        complaintModel.find({}, function (err, docs) {
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
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

}