var mongoose    = require("mongoose");
var utils       = require("../utils");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var closedRoadSchema = new Schema({
  nr:         String,
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
  },
  polyline : String
});

var ClosedRoad = mongoose.model('ClosedRoad', closedRoadSchema);

ClosedRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia intrerupta';
};

ClosedRoad.inRange = function(source, range) {
  ClosedRoad.find({}, function(err, roads) {
    if (err) throw err;
   console.log( roads.filter(function(e) {
     console.log(utils.getDistance(e.startPlace, source) + " : " + e.startPlace.name);
      return utils.getDistance(source, e.startPlace) <= range;
    }));
  });
};

ClosedRoad.getNearby = function(source, range, callback) {
  ClosedRoad.find({}, function(err, roads) {
    if (err) throw err;
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
};

closedRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = ClosedRoad;
