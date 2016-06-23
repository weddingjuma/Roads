/*global angular, google, $*/
'use strict'

angular.module('Roads').directive('roadEvent', ['QueueRequestsService', 'EncodingService', function(QRService, EncodingService) {
    return {
        scope: {
            data: '=',
            type: '@'
        },
        link: function(scope, elem, attrs, ctrl) {

            var titles = {
                slow: 'Drum cu circulatia ingreunata',
                closed: 'Drum inchis',
                inWork: 'Drum in lucru',
                weatherSlowed: 'Drum cu circulatia ingreunata din cauza vremii',
                weatherClosed: 'Drum inchis din cauza conditiilor meteo nefavorabile'
            };

            var colors = {
                slow: '158cba',
                closed: 'ff4136',
                inWork: 'ff851b',
                weatherSlowed: 'ff4136',
                weatherClosed: 'ff4136'
            };

            ctrl.data = scope.data;
            ctrl.type = scope.type;

            ctrl.title = titles[ctrl.type];

            elem.on('click', function() {
                ctrl.openModal(ctrl.data, ctrl.type);
            });

            var request = {
                startPlace: scope.data.startPlace,
                endPlace: scope.data.endPlace,
                polyline: scope.data.polyline
            }

            if (request.startPlace.lat == request.endPlace.lat && request.startPlace.lng == request.endPlace.lng) {
                if (!request.startPlace.lat && !request.endPlace.lat) {
                    elem.empty();
                }
                else {

                    var color = colors[scope.type];
                    ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "&zoom=10&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.endPlace.lng;

                }
            }
            
            if (!request.startPlace.lat || !request.endPlace.lat) {
                var place = request.startPlace.lat ? request.startPlace : request.endPlace;
                ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "&zoom=10&markers=color:0x" + color + "%7Clabel:A%7C" + place.lat + "," + place.lng;
            }
            
            
            else {
                 var color = colors[scope.type];
                 ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "%7Cenc:" + request.polyline + "&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.startPlace.lng + "&markers=color:0x" + color + "%7Clabel:B%7C" + request.endPlace.lat + "," + request.endPlace.lng;
                            
                // EncodingService.getEncoding(request).then(function success(response) {
                //     if (!response.data.length) {
                //         EncodingService.createEncoding(request).then(function(response) {
                //             console.log('encoding created', response);
                //         });
                //         QRService.queueRequest(request).then(function success(response) {

                //             var color = colors[scope.type];
                //             ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "%7Cenc:" + response.routes[0].overview_polyline + "&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.startPlace.lng + "&markers=color:0x" + color + "%7Clabel:B%7C" + request.endPlace.lat + "," + request.endPlace.lng;
                            
                //             request.polyline = response.routes[0].overview_polyline;
                            
                //         }, function error(response) {

                //             if (request.startPlace.lat || request.endPlace.lat) {
                //                 var place = request.startPlace.lat ? request.startPlace : request.endPlace;
                //                 var center = {
                //                     lat: place.lat,
                //                     lng: place.lng
                //                 };

                //                 var color = colors[scope.type];
                //                 ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "&zoom=11&markers=color:0x" + color + "%7Clabel:A%7C" + place.lat + "," + place.lng;

                //             }
                //             else {
                //                 elem.empty();
                //             }
                //         });
                //     } else {
                //         console.log(response);
                //          var color = colors[scope.type];
                //             ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "%7Cenc:" + response.data[0].polyline + "&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.startPlace.lng + "&markers=color:0x" + color + "%7Clabel:B%7C" + request.endPlace.lat + "," + request.endPlace.lng;
                            
                        
                //     }
                // });


            }
        },
        templateUrl: 'app/roads/templates/road-event.tmpl.html',
        controller: 'RoadEventController',
        controllerAs: 'eventCtrl'
    }
}]);