var request     = require("request");
var cheerio     = require("cheerio");
var tabletojson = require("tabletojson");
var config      = require("./config"); 

function scrapeTables(callback) {
    request(config.URL, function(error, response, html) {
       
        var $ = cheerio.load(html);
        var roadData = {
            weatherClosedRoads: tabletojson.convert('<table>' + $('table').html() + '</table>')[0],
            weatherSlowedRoads: tabletojson.convert('<table>' + $('table').nextAll('table').html() + '</table>')[0],
            closedRoads:        tabletojson.convert('<table>' + $('table').nextAll('table').nextAll('table').html() + '</table>')[0],
            slowRoads:          tabletojson.convert('<table>' + $('table').nextAll('table').nextAll('table').nextAll('table').html() + '</table>')[0],
            workingRoads:       tabletojson.convert('<table>' + $('table').nextAll('table').nextAll('table').nextAll('table').nextAll('table').html() + '</table>')[0]
       };
            
        for (var key in roadData) {
            if (roadData.hasOwnProperty(key)) {
                roadData[key] = roadData[key] == undefined ? null : roadData[key];
            }
        }
        
        callback(error, roadData);
    });
}

module.exports = scrapeTables;


