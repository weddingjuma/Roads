/*global angular*/
'use strict';

angular.module('Roads').factory('RoadsService', ['$http', function($http) {

    var slowRoads = function() {
        return $http.get('/api/slow-roads');
    }

    var closedRoads = function() {
        return $http.get('/api/closed-roads');
    }
    var roadsInWork = function() {
        return $http.get('/api/in-work-roads');
    }

    var roads = function() {
        return $http.get('/api/roads');
    }

    return {
        roads: roads,
        slowRoads: slowRoads,
        closedRoads: closedRoads,
        roadsInWork : roadsInWork
    }

}]);