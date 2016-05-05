/*global angular, google, $*/
'use strict'

angular.module('Roads').directive('roadEvent', ['QueueRequestsService', function(QRService) {
    return {
        scope: {
            data: '=',
            type: '@'
        },
        link: function(scope, elem, attrs, ctrl) {
            var titles = {
                slow : 'Slow road',
                closed : 'Closed road',
                inWork: 'Road in work'
            };
            
            var colors = {
                slow : '#158cba',
                closed : '#ff4136',
                inWork : '#ff851b'
            };
            
            ctrl.data = scope.data;
            ctrl.type = scope.type;
            
            ctrl.title = titles[ctrl.type];
            
            var request = {
                startPlace: scope.data.startPlace,
                endPlace: scope.data.endPlace
            }

            var polylineOptionsActual = new google.maps.Polyline({
                strokeColor: colors[ctrl.type],
                strokeOpacity: .8,
                strokeWeight: 5
            });

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: polylineOptionsActual
            });
            var map = new google.maps.Map($('.map', elem)[0], {
                scrollwheel: false,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false,
                draggable: false,
                disableDoubleClickZoom: true,
                panControl: false,
                streetViewControl: false,
                scaleControl: false,
                zoomControl: false,

            });

            if (request.startPlace.lat == request.endPlace.lat && request.startPlace.lng == request.endPlace.lng) {
                if (!request.startPlace.lat && !request.endPlace.lat) {
                    elem.empty();
                }
                else {
                    map.setCenter({
                        lat: request.startPlace.lat,
                        lng: request.endPlace.lng
                    });
                    map.setZoom(12);

                    var marker = new google.maps.Marker({
                        position: {
                            lat: request.startPlace.lat,
                            lng: request.endPlace.lng
                        },
                        map: map,
                        title: request.startPlace.name
                    });
                }


            }
            else {
                QRService.queueRequest(request).then(function success(response) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                }, function error(response) {

                    if (request.startPlace.lat || request.endPlace.lat) {
                        var place = request.startPlace.lat ? request.startPlace : request.endPlace;
                        var center = {
                            lat: place.lat,
                            lng: place.lng
                        };

                        map.setCenter(center);
                        map.setZoom(12);

                        var marker = new google.maps.Marker({
                            position: center,
                            map: map,
                            title: place.name
                        });
                    }
                    else {
                        elem.empty();
                    }
                });
            }



        },
        templateUrl: 'app/roads/templates/road-event.tmpl.html',
        controller: 'RoadEventController',
        controllerAs: 'eventCtrl'
    }
}]);