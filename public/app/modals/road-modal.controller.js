/*global angular*/
'use strict';
angular.module('Roads').controller('RoadModalController', function($uibModalInstance, data, type) {
    var ctrl = this;
    var titles = {
        slow: 'Drum cu circulatia ingreunata',
        closed: 'Drum inchis',
        inWork: 'Drum in lucru'
    };
    ctrl.title = titles[type];
    ctrl.data = data;

    ctrl.close = function() {
        $uibModalInstance.close();
    }

});