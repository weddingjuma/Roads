/*global angular*/
'use strict';

angular.module('Roads').controller('RoadsController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.slowRoads = [];
    ctrl.closedRoads = [];
    ctrl.roadsInWork = [];

    RoadsService.roads().then(function(response) {
       ctrl.slowRoads = response.data.slowRoads.data;
       ctrl.roadsInWork = response.data.workingRoads.data;
       ctrl.closedRoads = response.data.closedRoads.data;
    });


}]);
