var scraper = require("./scraper");
var ClosedRoad = require("./models/closedRoad");
var SlowRoad = require("./models/slowRoad");
var config = require("./config");
var async = require("async");

function loader_old(callback) {
    scraper(function(err, roadData) {
        if (err) throw err;
        async.series([
            function(callback) {
                console.log("start first");
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

                var callInterval = setInterval(function() {
                    var first = closedRoads.slice(0, config.geocodeLimit);
                    closedRoads = closedRoads.slice(config.geocodeLimit);
                    ClosedRoad.create(first);
                    if (!closedRoads.length) {
                        clearInterval(callInterval);
                        console.log("end first");
                        callback();
                    }
                }, config.geocodeDelay);
            },
            function(callback) {
                console.log("start second");
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

                var callInterval = setInterval(function() {
                    var first = slowRoads.slice(0, config.geocodeLimit);
                    slowRoads = slowRoads.slice(config.geocodeLimit);
                    SlowRoad.create(first);
                    if (!slowRoads.length) {
                        clearInterval(callInterval);
                        console.log("end second");
                        callback();
                    }
                }, config.geocodeDelay);
            }
        ], function(err) {
            console.log("finish");
           callback(err);
        });
    });
} // deprecated


function loader(callback) {
     scraper(function(err, roadData) {
        if (err) throw err;
        async.series([
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
               
            }
        ], function(err) {
           callback(err);
        });
    });
}

module.exports = loader;
