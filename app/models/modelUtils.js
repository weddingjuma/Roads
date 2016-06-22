var async = require("async");
var request = require("request");
var utils = require("../utils");


module.exports = {
    retrieveCoordsForLocations: function(next) {
        var places = this.between;

        var from = places
            .slice(0, places.indexOf(")") + 1)
            .replace(/ \(/g, ', ')
            .replace(/\)/g, '');

        var to = places
            .slice(places.indexOf(")") + 2)
            .replace(/ \(/g, ', ')
            .replace(/\)/g, '');

        var self = this;

        async.parallel([
                function(callback) {
                    utils.getCoords(from, function(coords) {
                        self.startPlace.name = from;
                        self.startPlace.lat = coords.latitude;
                        self.startPlace.lng = coords.longitude;

                        callback(null);
                    });
                },
                function(callback) {
                    utils.getCoords(to, function(coords) {
                        self.endPlace.name = to;
                        self.endPlace.lat = coords.latitude;
                        self.endPlace.lng = coords.longitude;

                        callback(null);
                    });
                }
            ],
            function(err, res) {
                next();
            });
    }
}