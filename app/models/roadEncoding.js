var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var modelUtils  = require("./modelUtils");

var roadEncodingSchema = new Schema({
  startPlace: {
    lat: Number,
    lng: Number
  },
  endPlace: {
    lat: Number,
    lng: Number
  },
  polyline : String
});

var RoadEncoding = mongoose.model('RoadEncoding', roadEncodingSchema);

module.exports = RoadEncoding;
