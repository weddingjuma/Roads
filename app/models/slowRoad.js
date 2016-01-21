var mongoose  = require("mongoose");
var async     = require("async");
var utils     = require("../utils");
var Schema    = mongoose.Schema;

var slowRoad = new Schema({
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

var SlowRoad = mongoose.model('SlowRoad', slowRoad);

SlowRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia ingreunata';
};

slowRoad.pre('save', function(next) {
  
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

module.exports = SlowRoad;
