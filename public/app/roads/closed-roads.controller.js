/*global angular*/
'use strict';

angular.module('Roads').controller('ClosedRoadsController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.closedRoads = [];

    RoadsService.closedRoads().then(function(response) {
       ctrl.closedRoads = response.data.data;
    });


}]);
