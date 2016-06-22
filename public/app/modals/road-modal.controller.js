/*global angular*/
'use strict';
angular.module('Roads').controller('RoadModalController', function($uibModalInstance, data, type) {
    var ctrl = this;
    var titles = {
        slow: 'Drum cu circulatia ingreunata',
        closed: 'Drum inchis',
        inWork: 'Drum in lucru',
        weatherClosed: 'Drum inchis din cauza conditiilor meteo nefavorabile',
        weatherSlowed: 'Drum cu circulatia ingreunata din cauza conditiilor meteo nefavorabile'
    };
    ctrl.title = titles[type];
    ctrl.data = data;

    ctrl.close = function() {
        $uibModalInstance.close();
    }

});