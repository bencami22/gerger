var http = require('http'),
  path = require('path'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  db = require('./model/db'),
  io = require('./sockets').listen(server),
  react = require('react'),
  session = require('express-session'),
  reactDOM = require('react-dom'),
  babel = require('babel-register')({
    presets: ['react']
  }),
  multer = require('multer'),
  imgur = require('imgur-uploader'),
  functions = require("firebase-functions"),
  cors = require("cors");

//The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

app.use(cors({ origin: true }))

app.use(session({
  secret: 'ThisisthesecretusedtosignthesessionIDcookie'
}));

app.use(express.static(path.resolve(__dirname, '..', 'client/public')));

app.get('*', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.sendfile(path.resolve(__dirname, '../client/public/index.html'));
});

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.post('/uploadHandler', upload.single('file'), function(req, res, next) {
  if (req.file && req.file.originalname) {
    console.log(`Received file ${req.file.originalname}`);
    imgur(req.file.buffer, { title: 'Gerger' }, 'Client-ID 90afb8526838fa5').then(data => {

      console.log(data);
      /*
      {
          id: 'OB74hEa',
          link: 'http://i.imgur.com/jbhDywa.jpg',
          title: 'Hello!',
          date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
          type: 'image/jpg',
          ...
      }
      */
      res.send({ url: data.link });
    });
  }
});

const functionsapi = functions.https.onRequest(app)

module.exports = {
  functionsapi
}
