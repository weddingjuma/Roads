// ===================================================
// Application setup
// ===================================================

//TODO: Add logger
var mongoose    = require("mongoose");
var ClosedRoad  = require("./app/models/closedRoad");
var scraper     = require("./app/scraper");             // Scrapes CNADNR page and parses tables
var config      = require("./app/config");              // Server configuration props
var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var routes      = require("./app/routes");              // Express router setup

// ===================================================
// Configuration
// ===================================================

mongoose.connect(config.dbUrl);                           // Connect to MongoDB

app.use(bodyParser.urlencoded({extended: true}));         // Parse application/x-www-form-urlencoded
app.use(bodyParser.json());                               // Parse application/json
app.use(function(req, res, next) {                        // Enable CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api", routes);                                  // Routes setup


// ===================================================
// Development only - will be replaced by app/scheduler.js
// ===================================================

// Remove records when server starts
ClosedRoad.remove({}, function(err) {  
  if (err) throw err;
});

// Returns parsed data from CNADNR for Closed roads
// TODO: Return data for ALL types of events
scraper(function(err, roadData) {       
  if(err) throw err;
  
  var closedRoads = roadData.closedRoads.map(function(item) {
    return new ClosedRoad({
      nr:         item['Nr. crt.'],
      DN:         item['DN'],
      positions:  item['Pozitii kilometrice'],
      between:    item['Intre localitatile'],
      cause:      item['Cauza'],
      measure:    item['Masuri de remediere si variante ocolitoare']
    });
  });
  
  ClosedRoad.create(closedRoads);
  
});


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
var io = require("socket.io")(server);
io.set( 'origins', '*:*' );

io.on('connection', function(socket) {
  
  console.log(socket.id + " connected");
  
  socket.emit('welcome', {message: "welcome to node"});
  
  socket.on('position', function(coords) {
    console.log(coords.lat + " | " + coords.lng);
    
    ClosedRoad.getNearby(coords, 100, function(arr) {
     socket.emit("nearby", arr);
    });
  });
  
  socket.on('disconnect', function(){
    console.log(socket.id + ' disconnected');
  });
});