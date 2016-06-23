var router            = require("express").Router();
var ClosedRoad        = require("./models/closedRoad");
var SlowRoad          = require("./models/slowRoad");
var InWorkRoad        = require("./models/inWorkRoad");
var WeatherClosedRoad = require("./models/weatherClosedRoad");
var WeatherSlowedRoad = require("./models/weatherSlowedRoad");
var RoadEncoding      = require("./models/roadEncoding");
var async             = require("async");
var config            = require("./config");

router.get("/", function(req, res) {
  res.json({
    status: 'working',
    URL : config.URL
  });
});

router.get("/roads", function(req, res) {
  var roads = {};
  async.parallel([
    function(callback) {
      WeatherClosedRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.weatherClosedRoads = {
            "title": WeatherClosedRoad.title(),
            "data": results
          };
          callback(null);
        });
    },
     function(callback) {
      WeatherSlowedRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.weatherSlowedRoads = {
            "title": WeatherSlowedRoad.title(),
            "data": results
          };
          callback(null);
        });
    },
    function(callback) {
      ClosedRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.closedRoads = {
            "title": ClosedRoad.title(),
            "data": results
          };
          callback(null);
        });
    },
    function(callback) {
      InWorkRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.inWorkRoads = {
            "title": InWorkRoad.title(),
            "data": results
          };
          callback(null);
        });
    },
    function(callback) {
      SlowRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.slowRoads = {
            title: SlowRoad.title(),
            data: results
          };
          callback(null);
        });
    }
  ], function(err) {
    if (err) throw err;
    res.json(roads);
  });
});

router.get("/weather-closed-roads", function(req, res) {

  WeatherClosedRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: WeatherClosedRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/weather-closed-roads/:place", function(req, res) {
  var place = req.params.place;

  WeatherClosedRoad.find({
    $or: [{
      'endPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }, {
      'startPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });

});

router.get("/weather-slowed-roads", function(req, res) {

  WeatherSlowedRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: WeatherSlowedRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/weather-slowed-roads/:place", function(req, res) {
  var place = req.params.place;

  WeatherSlowedRoad.find({
    $or: [{
      'endPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }, {
      'startPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });

});

router.get("/closed-roads", function(req, res) {

  ClosedRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: ClosedRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/closed-roads/:place", function(req, res) {
  var place = req.params.place;

  ClosedRoad.find({
    $or: [{
      'endPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }, {
      'startPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });

});

router.get("/slow-roads", function(req, res) {

  SlowRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: SlowRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/slow-roads/:place", function(req, res) {
  var place = req.params.place;

  SlowRoad.find({
    $or: [{
      'endPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }, {
      'startPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });

});

router.get("/in-work-roads", function(req, res) {

  InWorkRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: InWorkRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/in-work-roads/:place", function(req, res) {
  var place = req.params.place;

  InWorkRoad.find({
    $or: [{
      'endPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }, {
      'startPlace.name': {
        "$regex": place,
        "$options": "i"
      }
    }]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });

});

router.get('/encoding', function(req, res) {
  var startPlace = JSON.parse(req.query.startPlace);
  var endPlace = JSON.parse(req.query.endPlace);

  RoadEncoding
    .find({
      "endPlace" : { "lng" : endPlace.lng, "lat" : endPlace.lat }, "startPlace" : { "lng" : startPlace.lng, "lat" : startPlace.lat }
    })
    .exec(function(err, encoding) {
      if (err) throw err;
      res.json(encoding);
    });
});

router.post('/encoding', function(req, res) {
  var body = req.body;
  
  console.log('post ', req.body.startPlace, req.body.endPlace);
  
  RoadEncoding.create({
    startPlace : body.startPlace,
    endPlace : body.endPlace,
    polyline : body.polyline
  }, function(err, encoding) {
    if (err) throw err;
    res.status(200).send('Encoding created');
  });
  
});

module.exports = router;