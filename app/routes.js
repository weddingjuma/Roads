var router      = require("express").Router();
var ClosedRoad  = require("./models/closedRoad");
var SlowRoad    = require("./models/slowRoad");
var WorkingRoad = require("./models/workingRoad");
var async       = require("async");

router.get("/", function(req, res) {
  res.json({
    status: 'working'
  });
});

router.get("/roads", function(req, res) {
  var roads = {};
  async.parallel([
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
    },
    function(callback) {
      WorkingRoad
        .find({})
        .sort('nr')
        .exec(function(err, results) {
          if (err) throw err;
          roads.workingRoads = {
            title: WorkingRoad.title(),
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

router.get("/working-roads", function(req, res) {

  WorkingRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;

      var data = {
        title: WorkingRoad.title(),
        data: roads
      };

      res.json(data);
    });

});

router.get("/working-roads/:place", function(req, res) {
  var place = req.params.place;

  WorkingRoad.find({
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

module.exports = router;