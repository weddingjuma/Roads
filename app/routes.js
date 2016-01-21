var router      = require("express").Router();
var ClosedRoad  = require("./models/closedRoad");

router.get("/", function(req, res) {
  res.json({status: 'working'});
});

router.get("/roads", function(req, res) {
  
  ClosedRoad
    .find({})
    .sort('nr')
    .exec(function(err, roads) {
      if (err) throw err;
      
      var data = {
        title: ClosedRoad.title(),
        data : roads
      };
      
      res.json(data);
    });
  
});

router.get("/roads/:place", function(req, res) {
  var place = req.params.place;
  
  ClosedRoad.find({
    $or : [
      {'endPlace.name' : { "$regex": place, "$options": "i" }}, 
      {'startPlace.name' : { "$regex": place, "$options": "i" }}]
  }, function(err, roads) {
    if (err) {
      throw err;
    }
    res.json(roads);
  });
  
});

module.exports = router;