/*global angular*/
'use strict';

angular.module('Roads').controller('RoadsInWorkController', ['RoadsService', function(RoadsService) {
    var ctrl = this;
    ctrl.roadsInWork = [];

    RoadsService.roadsInWork().then(function(response) {
       ctrl.roadsInWork = response.data.data;
    });


}]);
