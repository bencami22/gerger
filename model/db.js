// Bring Mongoose into the app 
var mongoose = require('mongoose'); 

// Build the connection string 
var dbURI = 'mongodb://admin:Hello123!@cluster0-shard-00-00-f9wb8.mongodb.net:27017,cluster0-shard-00-01-f9wb8.mongodb.net:27017,cluster0-shard-00-02-f9wb8.mongodb.net:27017/ComplaintsDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// BRING IN YOUR SCHEMAS & MODELS // For example 
require('../model/Complaint');
require('../model/User');