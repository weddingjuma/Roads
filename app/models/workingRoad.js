var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var workingRoadSchema = new Schema({
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

var WorkingRoad = mongoose.model('WorkingRoad', workingRoadSchema);

WorkingRoad.title = function() {
  return 'Drumuri nationale si autostrazi pe care se efectueaza lucrari de reabilitari, modernizari, intretinere si reparatii';
};

workingRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = WorkingRoad;
