/*global angular*/
/*global google*/
angular.module('Roads').factory('QueueRequestsService', ['$q', '$http', function($q, $http) {

    var directionsService = new google.maps.DirectionsService;
    var queue = [];
    var interval = false;
    
    var startInterval = function() {
        interval = setInterval(function() {
            
            if (!!queue.length) {
                var deferred = queue.shift();
                var request = deferred.request;
                 
                 directionsService.route({
                        origin: new google.maps.LatLng(request.startPlace.lat, request.startPlace.lng),
                        destination: new google.maps.LatLng(request.endPlace.lat, request.endPlace.lng),
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            deferred.resolve(response);
                        } else {
                            if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
                              queue.push(deferred);
                            } else {
                                console.log(status);
                                deferred.reject(response);
                            }
                        }
                    });
            } else {
                clearInterval(interval);
                interval = false;
            }
            
        }, 0);
    };
    
    var queueRequest = function(request) {
        var deferred = $q.defer();
        
        deferred.request = request;
        queue.push(deferred);
        if (!interval) {
            startInterval();
        }
       
        return deferred.promise;
    };
    
    return {
        queueRequest : queueRequest
    };

}]);