/*global angular*/
'use strict';

angular.module('Roads').controller('RoadsController', ['RoadsService', '$scope', function(RoadsService, $scope) {
    var ctrl = this;
    ctrl.limits = [{
        current: 0
    }, {
        current: 0
    }, {
        current: 0
    }];
    ctrl.slowRoads = [];
    ctrl.closedRoads = [];
    ctrl.roadsInWork = [];
    ctrl.weatherSlowedRoads = [];
    ctrl.weatherClosedRoads = [];

    ctrl.slowRoadsLimit = 6;
    ctrl.roadsInWorkLimit = 0;
    ctrl.closedRoadsLimit = 0;
    ctrl.weatherSlowedRoadsLimit = 0;
    ctrl.weatherClosedRoadsLimit = 0;

    ctrl.init = function() {
        RoadsService.roads().then(function(response) {
            ctrl.slowRoads = response.data.slowRoads.data;
            ctrl.roadsInWork = response.data.inWorkRoads.data;
            ctrl.closedRoads = response.data.closedRoads.data;
            ctrl.weatherClosedRoads = response.data.weatherClosedRoads.data;
            ctrl.weatherSlowedRoads = response.data.weatherSlowedRoads.data;

            ctrl.limits = [{
                current: ctrl.slowRoadsLimit,
                max: ctrl.slowRoads.length
            }, {
                current: ctrl.roadsInWorkLimit,
                max: ctrl.roadsInWork.length
            }, {
                current: ctrl.closedRoadsLimit,
                max: ctrl.closedRoads.length
            }, {
                current: ctrl.weatherClosedRoadsLimit,
                max: ctrl.weatherClosedRoads.length
            }, {
                current: ctrl.weatherSlowedRoadsLimit,
                max: ctrl.weatherSlowedRoads.length
            }];
        });
    };

    ctrl.init();


    ctrl.load = function() {
        for (var i = 0; i < ctrl.limits.length; i++) {
            if (ctrl.limits[i].current >= ctrl.limits[i].max) {
                continue;
            }
            ctrl.limits[i].current += 6;
            $scope.$apply();
            if (ctrl.limits[i].current <= ctrl.limits[i].max) {
                break;
            }

        }
    };


}]);
