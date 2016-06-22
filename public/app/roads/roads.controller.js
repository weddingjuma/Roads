/*global angular*/
'use strict';

angular.module('Roads').controller('RoadsController', ['RoadsService', '$scope', function(RoadsService, $scope) {
    var ctrl = this;
    ctrl.limits = [{current: 0},{ current: 0},{current: 0}];
    ctrl.slowRoads = [];
    ctrl.closedRoads = [];
    ctrl.roadsInWork = [];

    ctrl.slowRoadsLimit = 6;
    ctrl.roadsInWorkLimit = 0;
    ctrl.closedRoadsLimit = 0;

    RoadsService.roads().then(function(response) {
        ctrl.slowRoads = response.data.slowRoads.data;
        ctrl.roadsInWork = response.data.inWorkRoads.data;
        ctrl.closedRoads = response.data.closedRoads.data;

        ctrl.limits = [{
            current: ctrl.slowRoadsLimit,
            max: ctrl.slowRoads.length
        }, {
            current: ctrl.roadsInWorkLimit,
            max: ctrl.roadsInWork.length
        }, {
            current: ctrl.closedRoadsLimit,
            max: ctrl.closedRoads.length
        }];
    });


    ctrl.load = function() {
        for (var i = 0; i < ctrl.limits.length; i++) {
            if ( ctrl.limits[i].current >= ctrl.limits[i].max ) {
                continue;
            }
            ctrl.limits[i].current += 3;
            $scope.$apply();
            if (ctrl.limits[i].current <= ctrl.limits[i].max) {
                break;
            }
            
        }
    }


}]);
