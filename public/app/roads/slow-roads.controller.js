/*global angular*/
'use strict';

angular.module('Roads').controller('SlowRoadsController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.slowRoads = [];

    RoadsService.slowRoads().then(function(response) {
       ctrl.slowRoads = response.data.data;
    });


}]);
