/*global angular*/
angular.module('Roads').factory('EncodingService', ['$q', '$http', function($q, $http) {

    var getEncoding = function(request) {
        return $http.get('/api/encoding', {
            params : request
        });
    }
    
    var createEncoding = function(request) {
        return $http.post('/api/encoding', request);
    }
    
    return {
        getEncoding : getEncoding,
        createEncoding : createEncoding
    }
    
    
}]);