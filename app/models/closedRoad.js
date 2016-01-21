var mongoose  = require("mongoose");
var async     = require("async");
var utils     = require("../utils");
var Schema    = mongoose.Schema;

var closedRoadSchema = new Schema({
  nr:         Number,
  DN:         String,
  positions:  String,
  between:    String,
  cause:      String,
  measure:    String,
  startPlace : {
    name:   String,
    lat:    Number,
    lng:    Number
  },
  endPlace : {
    name:   String,
    lat:    Number,
    lng:    Number
  }
});

var ClosedRoad = mongoose.model('ClosedRoad', closedRoadSchema);

ClosedRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia intrerupta';
};

ClosedRoad.inRange = function(source, range) {
  ClosedRoad.find({}, function(err, roads) {
   console.log( roads.filter(function(e) {
     console.log(utils.getDistance(e.startPlace, source) + " : " + e.startPlace.name);
      return utils.getDistance(source, e.startPlace) <= range;
    }));
  });
}

ClosedRoad.getNearby = function(source, range, callback) {
  ClosedRoad.find({}, function(err, roads) {
    
    var near = roads
                .map(function(item) {
                  return {
                    place: item.startPlace.name,
                    distance: utils.getDistance(item.startPlace, source)
                  };
                })
                .filter(function(e) {
                  return e.distance <= range;
                });
              
    callback(near);
  });
}

closedRoadSchema.pre('save', function(next) {
  
  var places = this
                .between
                .replace(/ \(/g, ', ')
                .replace(/\)/g, '')
                .split("-");
  
  var _this = this;
  
  async.parallel([
    function(callback) {
      utils.geocode(places[0], function(err, res, data) {
        _this.startPlace.name = places[0];
        _this.startPlace.lat = data.results[0].geometry.location.lat;
        _this.startPlace.lng = data.results[0].geometry.location.lng;
    
        callback(null);
      }); 
    },
    function(callback) {
      utils.geocode(places[1], function(err, res, data) {
        _this.endPlace.name = places[1];
        _this.endPlace.lat = data.results[0].geometry.location.lat;
        _this.endPlace.lng = data.results[0].geometry.location.lng;
    
        callback(null);
      }); 
    }],
    function(err, res) {
      next();
    });
});

module.exports = ClosedRoad;
