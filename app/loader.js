var scraper = require("./scraper");
var ClosedRoad = require("./models/closedRoad");
var SlowRoad = require("./models/slowRoad");
var WeatherClosedRoad = require("./models/weatherClosedRoad");
var WeatherSlowedRoad = require("./models/weatherSlowedRoad");
var InWorkRoad = require("./models/inWorkRoad");
var async = require("async");
var request = require("request");
var config = require("./config");


function requestAndUpdate(results, time, callback) {
    var interval = setInterval(function() {
        var res = results.shift();
        var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + res.startPlace.lat + ',' + res.startPlace.lng + '&destination=' + res.endPlace.lat + ',' + res.endPlace.lng + '&mode=driving';
        request(url, function(error, response, body) {
            console.log(res.startPlace, res.endPlace);
            var data = JSON.parse(body);
            console.log(data.status);
            if (data.status == 'OK') {
                res.polyline = data.routes[0].overview_polyline.points;
                res.save();
            }
            if (data.status == 'OVER_QUERY_LIMIT') {
                console.log("retrying");
                results.push(res);
            }
        });
        if (!results.length) {
            clearInterval(interval);
            callback();
        }
    }, time);
}

function encodePolylines(callback) {
    var time = config.apiRequestDelay;
    async.series([
        function(callback) {
            ClosedRoad
                .find({})
                .exec(function(err, results) {
                    if (err) {
                        callback(err);
                    }
                    requestAndUpdate(results, time, callback);
                });
        },
        function(callback) {
            SlowRoad
                .find({})
                .exec(function(err, results) {
                    if (err) {
                        callback(err);
                    }
                    requestAndUpdate(results, time, callback);
                });
        },
        function(callback) {
            InWorkRoad
                .find({})
                .exec(function(err, results) {
                    if (err) {
                        callback(err);
                    }
                    requestAndUpdate(results, time, callback);
                });
        },
        function(callback) {
            WeatherClosedRoad
                .find({})
                .exec(function(err, results) {
                    if (err) {
                        callback(err);
                    }
                    requestAndUpdate(results, time, callback);
                });
        },
        function(callback) {
            WeatherSlowedRoad
                .find({})
                .exec(function(err, results) {
                    if (err) {
                        callback(err);
                    }
                    requestAndUpdate(results, time, callback);
                });
        }
    ], function(err) {
        callback(err);
    });
}

function loader(callback) {
    scraper(function(err, roadData) {
        if (err) throw err;
        async.series([
            function(callback) {
                var weatherClosedRoads = roadData.weatherClosedRoads.map(function(item) {
                    return new WeatherClosedRoad({
                        nr: item['Nr. crt.'],
                        DN: item['DN'],
                        positions: item['Pozitii kilometrice'],
                        between: item['Intre localitatile'],
                        cause: item['Cauza'],
                        measure: item['Masuri de remediere si variante ocolitoare']
                    });
                });
                WeatherClosedRoad.create(weatherClosedRoads, function(err) {
                    callback(err);
                });
            },
            function(callback) {
                var weatherSlowedRoads = roadData.weatherSlowedRoads.map(function(item) {
                    return new WeatherSlowedRoad({
                        nr: item['Nr. crt.'],
                        DN: item['DN'],
                        positions: item['Pozitii kilometrice'],
                        between: item['Intre localitatile'],
                        cause: item['Cauza'],
                        measure: item['Masuri de remediere']
                    });
                });
                WeatherSlowedRoad.create(weatherSlowedRoads, function(err) {
                    callback(err);
                });
            },
            function(callback) {
                var closedRoads = roadData.closedRoads.map(function(item) {
                    return new ClosedRoad({
                        nr: item['Nr. crt.'],
                        DN: item['DN'],
                        positions: item['Pozitii kilometrice'],
                        between: item['Intre localitatile'],
                        cause: item['Cauza'],
                        measure: item['Masuri de remediere si variante ocolitoare']
                    });
                });
                ClosedRoad.create(closedRoads, function(err) {
                    callback(err);
                });
            },
            function(callback) {
                var inWorkRoads = roadData.inWorkRoads.map(function(item) {
                    return new InWorkRoad({
                        nr: item['Nr. crt.'],
                        DN: item['DN'],
                        positions: item['Pozitii kilometrice'],
                        between: item['Intre localitatile'],
                        cause: item['Tip lucrare / Perioada'],
                        measure: item['Termen de finalizare si variante ocolitoare']
                    });
                });
                InWorkRoad.create(inWorkRoads, function(err) {
                    callback(err);
                });
            },
            function(callback) {
                var slowRoads = roadData.slowRoads.map(function(item) {
                    return new SlowRoad({
                        nr: item['Nr. crt.'],
                        DN: item['DN'],
                        positions: item['Pozitii kilometrice'],
                        between: item['Intre localitatile'],
                        cause: item['Cauza'],
                        measure: item['Masuri de remediere']
                    });
                });
                SlowRoad.create(slowRoads, function(err) {
                    callback(err);
                });
            },
            function(callback) {
                encodePolylines(callback);
            }
        ], function(err) {
            callback(err);
        });
    });
}

module.exports = loader;
