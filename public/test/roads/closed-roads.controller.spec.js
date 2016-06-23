/*global inject, expect, spyOnAngularService, spyOnAngularServiceError*/
describe('ClosedRoadsController', function() {
    var RoadsService;
    var ctrl;

    beforeEach(function() {
        module('Roads');

        inject(function($injector) {
            RoadsService = $injector.get('RoadsService');
            ctrl = $injector.get('$controller')('ClosedRoadsController', {
                RoadsService: RoadsService
            });
        });
    });

    describe('Initialization', function() {
        it('Should instatiate local variables with default values', function() {
            expect(ctrl.closedRoads).toEqual([]);
            expect(ctrl.weatherClosedRoads).toEqual([]);
        });
    });

    describe('Service calls', function() {
        it('Should call RoadsService and retrieve closed and weather closed roads', function() {
            var roads = [{a: 1}, {b: 2}];
            var response = {
                data: {
                    data: roads
                }
            };
            var closedRoadsSpy = spyOnAngularService(RoadsService, 'closedRoads', response);
            var weatherClosedRoadsSpy = spyOnAngularService(RoadsService, 'weatherClosedRoads', response);
    
            ctrl.init();

            expect(closedRoadsSpy).toHaveBeenCalled();
            expect(weatherClosedRoadsSpy).toHaveBeenCalled();
            
            expect(ctrl.closedRoads).toEqual(roads);
            expect(ctrl.weatherClosedRoads).toEqual(roads);
            
        });
    });


});