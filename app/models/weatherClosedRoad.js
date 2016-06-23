var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var weatherClosedRoadSchema = new Schema({
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

var WeatherClosedRoad = mongoose.model('WeatherClosedRoad', weatherClosedRoadSchema);

WeatherClosedRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia intrerupta din cauza conditiilor meteo nefavorabile';
};

weatherClosedRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = WeatherClosedRoad;
