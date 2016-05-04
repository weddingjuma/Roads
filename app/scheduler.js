var config  = require("./config");
var request = require("request");
var cheerio = require("cheerio");
var loader  = require("./loader");

var lastUpdate = "";

function scheduler() {
    setInterval(function() {

        getLastPageUpdate(function(error, data) {
            if (lastUpdate != data) {
                lastUpdate = data;
                console.log("New page update detected", data);
                loader(function() {
                    console.log("Data loading complete.");
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

module.exports = scheduler;