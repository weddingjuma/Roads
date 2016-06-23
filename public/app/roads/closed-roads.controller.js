/*global angular*/
'use strict';

angular.module('Roads').controller('ClosedRoadsController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.closedRoads = [];
    ctrl.weatherClosedRoads = [];

    ctrl.init = function() {

        RoadsService.closedRoads().then(function(response) {
            ctrl.closedRoads = response.data.data;
        });

        RoadsService.weatherClosedRoads().then(function(response) {
            ctrl.weatherClosedRoads = response.data.data;
        });
    };

    
    ctrl.init();
    
}]);
