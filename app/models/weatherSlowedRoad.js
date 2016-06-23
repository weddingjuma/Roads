var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var weatherSlowedRoadSchema = new Schema({
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

var WeatherSlowedRoad = mongoose.model('WeatherSlowedRoad', weatherSlowedRoadSchema);

WeatherSlowedRoad.title = function() {
  return 'Drumuri nationale si autostrazi cu circulatia ingreunata din cauza conditiilor meteo nefavorabile';
};

weatherSlowedRoadSchema.pre('save', modelUtils.retrieveCoordsForLocations);

module.exports = WeatherSlowedRoad;
