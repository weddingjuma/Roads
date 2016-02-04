var config      = require("./config");
var scraper     = require("./scraper");
var ClosedRoad  = require("./models/closedRoad");
var mongoose    = require("mongoose");

mongoose.connect(config.dbUrl);

setInterval(function() {
    scraper(function(err, roadData) {
        if (err) throw err;

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

        console.log(new Date());
        closedRoads.forEach(function(el, idx) {
            ClosedRoad.findOne({
                nr: el.nr
            }, function(err, road) {
                if (err) throw err;
                if (!road) {
                    ClosedRoad.create(el);
                    console.log(new Date() + ': New closed road added ' + el._id);
                    return;
                }

                if (el.DN != road.DN || el.positions != road.positions || el.between != road.between || el.cause != road.cause || el.measure != road.measure) {
                    road.DN = el.DN;
                    road.between = el.between;
                    road.cause = el.cause;
                    road.measure = el.measure;

                    road.save(function(err) {
                        if (err) throw err;

                        console.log(new Date() + ': Closed road updated ' + road._id);
                    });
                    return;
                }
            });
        });
    });

}, config.interval);