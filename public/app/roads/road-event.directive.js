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
                inWork: 'FF530D',
                weatherSlowed: '158cba',
                weatherClosed: 'ff4136'
            };
            
            var color = colors[scope.type];

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
            };

            if (request.startPlace.lat == request.endPlace.lat && request.startPlace.lng == request.endPlace.lng) {
                if (!request.startPlace.lat && !request.endPlace.lat) {
                    elem.empty();
                }
                else {
                    ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "&zoom=10&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.endPlace.lng;
                }
            }
            if (!request.startPlace.lat || !request.endPlace.lat) {
                var place = request.startPlace.lat ? request.startPlace : request.endPlace;
                ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "&zoom=10&markers=color:0x" + color + "%7Clabel:A%7C" + place.lat + "," + place.lng;
            }
            else {
                 ctrl.img = "https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:5%7Ccolor:0x" + color + "%7Cenc:" + request.polyline + "&markers=color:0x" + color + "%7Clabel:A%7C" + request.startPlace.lat + "," + request.startPlace.lng + "&markers=color:0x" + color + "%7Clabel:B%7C" + request.endPlace.lat + "," + request.endPlace.lng;
            }
        },
        templateUrl: 'app/roads/templates/road-event.tmpl.html',
        controller: 'RoadEventController',
        controllerAs: 'eventCtrl'
    }
}]);