var config      = require("./config");
var request     = require("request");
var cheerio     = require("cheerio");
var loader      = require("./loader");
var ClosedRoad  = require("./models/closedRoad");
var SlowRoad    = require("./models/slowRoad");
var WorkingRoad = require("./models/workingRoad");
var async       = require("async");

var lastUpdate = "";

function scheduler() {
    setInterval(function() {

        getLastPageUpdate(function(error, data) {
            if (lastUpdate != data) {
                lastUpdate = data;
                console.log("New page update detected", data);
                clearOldData(function() {
                    loader(function() {
                        console.log("Data loading complete.");
                    });
                });
            }
        });

    }, config.interval);
}

function getLastPageUpdate(callback) {

    request(config.URL, function(error, response, html) {

        var $ = cheerio.load(html);
        var lastUpdate = $('h6').html();
        callback(error, lastUpdate);

    });
}

function clearOldData(callback) {

    async.parallel([
        function(callback) {
            ClosedRoad.remove({}, function(err) {
                if (err) throw err;
                callback();
            });
        },
        function(callback) {
            SlowRoad.remove({}, function(err) {
                if (err) throw err;
                callback();
            });
        },
        function(callback0) {
            WorkingRoad.remove({}, function(err) {
                if (err) throw err;
                callback();
            });
        }
    ], function(err, res) {
        if (err) throw err;
        callback();
    });

}

module.exports = scheduler;