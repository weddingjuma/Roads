/*global angular*/
'use strict';

angular.module('Roads').controller('SlowRoadsController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.slowRoads = [];
    ctrl.weatherSlowedRoads = [];

    ctrl.init = function() {
        RoadsService.slowRoads().then(function(response) {
            ctrl.slowRoads = response.data.data;
        });

        RoadsService.weatherSlowedRoads().then(function(response) {
            ctrl.weatherSlowedRoads = response.data.data;
        });
    }

    ctrl.init();

}]);
