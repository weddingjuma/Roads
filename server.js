// ===================================================
// Application setup
// ===================================================

var mongoose    = require("mongoose");
var config      = require("./app/config");              // Server configuration props
var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var routes      = require("./app/routes");              // Express router setup
var scheduler   = require("./app/scheduler");
var morgan      = require("morgan");

// ===================================================
// Configuration
// ===================================================
var mongodbConfig = config.mongodbConfig;
mongoose.connect(mongodbConfig.url);                           // Connect to MongoDB

// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));         // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());                               // Parse application/json
app.use(function(req, res, next) {                        // Enable CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
        res.sendfile('./public/index.html');              // load the single view file (angular will handle the page changes on the front-end)
});
app.use("/api", routes);                                  // Routes setup

// Scrape data from CNADNR and insert in db
scheduler();

// ===================================================
// Local server setup
// ===================================================

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at", host + ":" + port);
});


// ===================================================
// Socket configuration to communicate with client
// ===================================================

// TODO: Move to separate module!
// var io = require("socket.io")(server);
// io.set( 'origins', '*:*' );

// io.on('connection', function(socket) {
  
//   console.log(socket.id + " connected");
  
//   socket.emit('welcome', {message: "welcome to node"});
  
//   socket.on('position', function(coords) {
//     console.log(coords.lat + " | " + coords.lng);
    
//     ClosedRoad.getNearby(coords, 100, function(arr) {
//     socket.emit("nearby", arr);
//     });
//   });
  
//   socket.on('disconnect', function(){
//     console.log(socket.id + ' disconnected');
//   });
// });