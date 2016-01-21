var utils = require("./app/utils");

utils.geocode('cunta', function(err, res, data) {
   console.log(data.results[0].geometry.location.lat);
});