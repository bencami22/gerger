var http = require('http'),
  path = require('path'),
  express = require('express'),
  router = express(),
  server = http.createServer(router),
  db = require('./model/db'),
  io = require('./sockets').listen(server),
  react=require('react'),
  reactDOM=require('react-dom'),
  babel=require('babel-register')({
    presets:['react']
  });
  

//The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

router.use(express.static(path.resolve(__dirname, 'client')));
