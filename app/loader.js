var scraper     = require("./scraper");
var ClosedRoad  = require("./models/closedRoad");
var SlowRoad    = require("./models/slowRoad");
var WeatherClosedRoad = require("./models/weatherClosedRoad");
var WeatherSlowedRoad = require("./models/weatherSlowedRoad");
var InWorkRoad = require("./models/inWorkRoad");
var async       = require("async");

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
                        workType: item['Tip lucrare / Perioada'],
                        finishDate: item['Termen de finalizare si variante ocolitoare']
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
               
            }
        ], function(err) {
           callback(err);
        });
    });
}

module.exports = loader;
