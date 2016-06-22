var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var inWorkRoadSchema = new Schema({
  nr: String,
  DN: String,
  positions: String,
  between: String,
  workType: String,
  finishDate: String,
  startPlace: {
    name: String,
    lat: Number,
    lng: Number
  },
  endPlace: {
    name: String,
    lat: Number,
    lng: Number
  }
});

var InWorkRoad = mongoose.model('InWorkRoad', inWorkRoadSchema);

InWorkRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia ingreunata';
};

inWorkRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = InWorkRoad;
