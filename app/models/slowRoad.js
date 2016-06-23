var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var slowRoadSchema = new Schema({
  nr: String,
  DN: String,
  positions: String,
  between: String,
  cause: String,
  measure: String,
  startPlace: {
    name: String,
    lat: Number,
    lng: Number
  },
  endPlace: {
    name: String,
    lat: Number,
    lng: Number
  },
  polyline: String
});

var SlowRoad = mongoose.model('SlowRoad', slowRoadSchema);

SlowRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia ingreunata';
};

slowRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = SlowRoad;
