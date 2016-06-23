/*global angular, google*/
'use strict';

angular.module('Roads').controller('RoadEventController', function($uibModal) {
    var ctrl = this;

    ctrl.openModal = function(data, type) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: './app/modals/templates/road-modal.tmpl.html',
            controller: 'RoadModalController',
            controllerAs: 'roadModalCtrl',
            size: 'lg',
            resolve: {
                data: function() {
                    return data;
                },
                type: function() {
                    return type;
                }
            }
        });

        modalInstance.rendered.then(function() {
            var mapDiv = angular.element("#road-modal-map");

            var polylineOptionsActual = new google.maps.Polyline({
                strokeColor: 'red',
                strokeOpacity: .8,
                strokeWeight: 5
            });

            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                polylineOptions: polylineOptionsActual
            });
            var map = new google.maps.Map(mapDiv[0], {
                zoom: 10
            });
            directionsDisplay.setMap(map);
            
            if (!data.startPlace.lat) {
                data.startPlace = data.endPlace;
            }
            
            if (!data.endPlace.lat) {
                data.endPlace = data.startPlace;
            }
            
            directionsService.route({
                origin: new google.maps.LatLng({
                    lat: data.startPlace.lat,
                    lng: data.startPlace.lng
                }),
                destination: new google.maps.LatLng({
                    lat: data.endPlace.lat,
                    lng: data.endPlace.lng
                }),
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        });
        
    }

});