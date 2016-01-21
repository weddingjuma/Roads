var request = require("request");

var rad = function(x) {
  return x * Math.PI / 180;
};

var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

module.exports = {
    /*  
        Google Maps API geocoder
        Transforms address in coordinates
    */
    geocode: function(place, callback) {
        request(geocodeUrl + place, function(err, res, html) {
            
            var data = JSON.parse(html);
            console.log(place + " -> " + data.status);
            if (data.status != "OK") {
                //.geometry.location.lat;
                data.results.push({ "geometry" : { "location" : { "lat" : null, "lng" : null } } });
            }
            callback(err, res, data);
        });
    },
    
    /* 
        Haversine formula to calculate distance between two geographical points
    */
    getDistance: function(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat - p1.lat);
        var dLong = rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
                    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * 
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d / 1000; // returns the distance in km
    },
    
    fields: ['nr', 'DN', 'positions', 'between', 'cause', 'measure']
}




